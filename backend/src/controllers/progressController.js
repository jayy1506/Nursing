import { Progress } from '../models/Progress.js';
import { Chapter } from '../models/Chapter.js';
import { Subtopic } from '../models/Subtopic.js';
import { Attempt } from '../models/Attempt.js';
import { ensureStudentProgressInitialized } from '../services/gatingService.js';

// Get comprehensive progress overview for the authenticated student
export const getMyProgress = async (req, res) => {
  try {
    const studentId = req.user.uid;
    await ensureStudentProgressInitialized(studentId);

    // Fetch chapters, subtopics, progress, and attempts concurrently in parallel
    const [chapters, allSubtopics, studentProgress, attempts] = await Promise.all([
      Chapter.find().sort({ order: 1 }).lean(),
      Subtopic.find().lean(),
      Progress.find({ studentId }).lean(),
      Attempt.find({ studentId }).sort({ timestamp: -1 }).lean()
    ]);

    const totalChapters = chapters.length;
    const totalSubtopics = allSubtopics.length;

    const completedSubtopics = studentProgress.filter(
      (p) => p.subtopicId !== null && p.status === 'completed'
    );
    const completedChapters = studentProgress.filter(
      (p) => p.subtopicId === null && p.chapterId !== null && p.status === 'completed'
    );

    const passedAttempts = attempts.filter((a) => a.passed);

    const completionPercentage = totalSubtopics > 0
      ? Math.round((completedSubtopics.length / totalSubtopics) * 100)
      : 0;

    const averageScore = attempts.length > 0
      ? Math.round(attempts.reduce((acc, a) => acc + a.percentage, 0) / attempts.length)
      : 0;

    return res.status(200).json({
      success: true,
      metrics: {
        totalChapters,
        completedChaptersCount: completedChapters.length,
        totalSubtopics,
        completedSubtopicsCount: completedSubtopics.length,
        completionPercentage,
        totalAttempts: attempts.length,
        passedAttemptsCount: passedAttempts.length,
        averageScore
      },
      progressRecords: studentProgress,
      recentAttempts: attempts.slice(0, 5)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve student progress',
      details: error.message
    });
  }
};

// Sync localStorage completed unit IDs with MongoDB (Optimized BulkWrite)
export const syncProgress = async (req, res) => {
  try {
    const studentId = req.user.uid || req.user.email;
    const { completedUnitIds = [] } = req.body;

    if (!Array.isArray(completedUnitIds)) {
      return res.status(400).json({ success: false, error: 'completedUnitIds must be an array' });
    }

    const validUnitIds = completedUnitIds.filter((id) => id && typeof id === 'string');
    const now = new Date();

    // High performance bulkWrite in 1 network roundtrip
    if (validUnitIds.length > 0) {
      const bulkOps = validUnitIds.map((unitId) => ({
        updateOne: {
          filter: { studentId, unitKey: unitId },
          update: {
            $set: {
              status: 'completed',
              completedAt: now
            },
            $setOnInsert: {
              unlockedAt: now
            }
          },
          upsert: true
        }
      }));
      await Progress.bulkWrite(bulkOps, { ordered: false });
    }

    // Fetch all completed unitKeys for this student to return merged set
    const allProgress = await Progress.find({
      studentId,
      status: 'completed'
    }, 'unitKey').lean();

    const mergedUnitIds = Array.from(
      new Set(
        allProgress
          .map((p) => p.unitKey)
          .filter(Boolean)
          .concat(validUnitIds)
      )
    );

    return res.status(200).json({
      success: true,
      message: 'Progress synchronized with MongoDB',
      syncedCount: validUnitIds.length,
      totalCompletedUnits: mergedUnitIds.length,
      completedUnitIds: mergedUnitIds
    });
  } catch (error) {
    console.error('[Progress Sync Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to synchronize progress',
      details: error.message
    });
  }
};

// Get list of all completed unit keys for the authenticated student
export const getCompletedUnits = async (req, res) => {
  try {
    const studentId = req.user.uid || req.user.email;
    const allProgress = await Progress.find({
      studentId,
      status: 'completed'
    }).lean();

    const completedUnitIds = allProgress
      .map((p) => p.unitKey)
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      completedUnitIds
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve completed units',
      details: error.message
    });
  }
};
