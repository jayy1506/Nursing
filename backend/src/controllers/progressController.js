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

    const chapters = await Chapter.find().sort({ order: 1 }).lean();
    const totalChapters = chapters.length;

    const allSubtopics = await Subtopic.find().lean();
    const totalSubtopics = allSubtopics.length;

    const studentProgress = await Progress.find({ studentId }).lean();
    const completedSubtopics = studentProgress.filter(
      (p) => p.subtopicId !== null && p.status === 'completed'
    );
    const completedChapters = studentProgress.filter(
      (p) => p.subtopicId === null && p.chapterId !== null && p.status === 'completed'
    );

    const attempts = await Attempt.find({ studentId }).sort({ timestamp: -1 }).lean();
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

// Sync localStorage completed unit IDs with MongoDB
export const syncProgress = async (req, res) => {
  try {
    const studentId = req.user.uid || req.user.email;
    const { completedUnitIds = [] } = req.body;

    if (!Array.isArray(completedUnitIds)) {
      return res.status(400).json({ success: false, error: 'completedUnitIds must be an array' });
    }

    // Upsert each incoming unitId as completed
    const now = new Date();
    for (const unitId of completedUnitIds) {
      if (!unitId || typeof unitId !== 'string') continue;
      await Progress.findOneAndUpdate(
        { studentId, unitKey: unitId },
        {
          $set: {
            status: 'completed',
            completedAt: now
          },
          $setOnInsert: {
            unlockedAt: now
          }
        },
        { upsert: true, new: true }
      );
    }

    // Fetch all completed unitKeys for this student to return merged set
    const allProgress = await Progress.find({
      studentId,
      status: 'completed'
    }).lean();

    const mergedUnitIds = Array.from(
      new Set(
        allProgress
          .map((p) => p.unitKey)
          .filter(Boolean)
          .concat(completedUnitIds)
      )
    );

    return res.status(200).json({
      success: true,
      message: 'Progress synchronized with MongoDB',
      syncedCount: completedUnitIds.length,
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
