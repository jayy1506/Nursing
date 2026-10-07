import { Course } from '../models/Course.js';
import { Chapter } from '../models/Chapter.js';
import { Subtopic } from '../models/Subtopic.js';
import { Progress } from '../models/Progress.js';
import { Attempt } from '../models/Attempt.js';

export const PASSING_PERCENTAGE = 75; // 75% standard for nursing competencies

/**
 * Initializes default progress for a student if not already present.
 * The first subtopic of the first chapter is unlocked by default.
 */
export const ensureStudentProgressInitialized = async (studentId) => {
  const firstChapter = await Chapter.findOne().sort({ order: 1 });
  if (!firstChapter) return;

  const firstSubtopic = await Subtopic.findOne({ chapterId: firstChapter._id }).sort({ order: 1 });
  if (!firstSubtopic) return;

  // Check if first subtopic progress exists
  const existingProg = await Progress.findOne({
    studentId,
    chapterId: firstChapter._id,
    subtopicId: firstSubtopic._id
  });

  if (!existingProg) {
    await Progress.create({
      studentId,
      chapterId: firstChapter._id,
      subtopicId: firstSubtopic._id,
      status: 'in-progress',
      unlockedAt: new Date()
    });
  }
};

/**
 * Verifies if a student is permitted to access/take a subtopic quiz.
 */
export const verifySubtopicAccess = async (studentId, subtopicId) => {
  const subtopic = await Subtopic.findById(subtopicId);
  if (!subtopic) {
    return { allowed: false, reason: 'Subtopic not found' };
  }

  const chapter = await Chapter.findById(subtopic.chapterId);
  if (!chapter) {
    return { allowed: false, reason: 'Chapter not found' };
  }

  // Chapter 1, Subtopic 1 is always accessible
  const firstChapter = await Chapter.findOne().sort({ order: 1 });
  const isFirstChapter = firstChapter && firstChapter._id.equals(chapter._id);

  if (isFirstChapter && subtopic.order === 1) {
    return { allowed: true, subtopic, chapter };
  }

  // If not first subtopic of chapter, verify previous subtopic in this chapter is completed
  if (subtopic.order > 1) {
    const prevSubtopic = await Subtopic.findOne({
      chapterId: chapter._id,
      order: subtopic.order - 1
    });

    if (prevSubtopic) {
      const prevProgress = await Progress.findOne({
        studentId,
        chapterId: chapter._id,
        subtopicId: prevSubtopic._id,
        status: 'completed'
      });

      if (!prevProgress) {
        return {
          allowed: false,
          reason: `Locked: You must complete and pass '${prevSubtopic.title}' quiz first.`
        };
      }
    }
  } else {
    // Subtopic order 1 of subsequent chapters (Chapter > 1): verify previous chapter final is completed
    const prevChapter = await Chapter.findOne({ order: chapter.order - 1 });
    if (prevChapter) {
      const prevChapterProgress = await Progress.findOne({
        studentId,
        chapterId: prevChapter._id,
        subtopicId: null,
        status: 'completed'
      });

      if (!prevChapterProgress) {
        return {
          allowed: false,
          reason: `Locked: You must pass Chapter ${prevChapter.order} Final Assessment before unlocking Chapter ${chapter.order}.`
        };
      }
    }
  }

  return { allowed: true, subtopic, chapter };
};

/**
 * Verifies if a student is permitted to take the Chapter Final Assessment.
 * Chapter final requires ALL subtopic quizzes in that chapter to be completed & passed.
 */
export const verifyChapterFinalAccess = async (studentId, chapterId) => {
  const chapter = await Chapter.findById(chapterId);
  if (!chapter) {
    return { allowed: false, reason: 'Chapter not found' };
  }

  const subtopics = await Subtopic.find({ chapterId }).sort({ order: 1 });
  if (subtopics.length === 0) {
    return { allowed: true, chapter };
  }

  // Query progress for all subtopics in this chapter
  const completedProgresses = await Progress.find({
    studentId,
    chapterId,
    subtopicId: { $in: subtopics.map((s) => s._id) },
    status: 'completed'
  });

  const completedIds = new Set(completedProgresses.map((p) => p.subtopicId.toString()));
  const missingSubtopics = subtopics.filter((s) => !completedIds.has(s._id.toString()));

  if (missingSubtopics.length > 0) {
    return {
      allowed: false,
      reason: `Chapter Final Locked: Complete all ${subtopics.length} subtopic quizzes in this chapter first. Remaining: ${missingSubtopics.map((s) => s.title).join(', ')}`,
      missingCount: missingSubtopics.length,
      totalRequired: subtopics.length
    };
  }

  return { allowed: true, chapter };
};

/**
 * Verifies if a student is permitted to take the Course Final Assessment.
 * Course final requires ALL chapters in the course to have completed chapter finals.
 */
export const verifyCourseFinalAccess = async (studentId, courseId) => {
  const chapters = await Chapter.find({ courseId }).sort({ order: 1 });
  if (chapters.length === 0) {
    return { allowed: true };
  }

  // Check chapter final completions (subtopicId: null)
  const completedChapters = await Progress.find({
    studentId,
    chapterId: { $in: chapters.map((c) => c._id) },
    subtopicId: null,
    status: 'completed'
  });

  const completedChapterIds = new Set(completedChapters.map((p) => p.chapterId.toString()));
  const incompleteChapters = chapters.filter((c) => !completedChapterIds.has(c._id.toString()));

  if (incompleteChapters.length > 0) {
    return {
      allowed: false,
      reason: `Course Final Exam Locked: You must complete and pass all ${chapters.length} chapter final assessments first. Incomplete chapters: ${incompleteChapters.map((c) => `Chapter ${c.order}: ${c.title}`).join('; ')}`,
      missingCount: incompleteChapters.length,
      totalRequired: chapters.length
    };
  }

  return { allowed: true };
};

/**
 * Advance student progress after passing an assessment.
 */
export const handleAssessmentPassed = async (studentId, scopeType, scopeId) => {
  if (scopeType === 'subtopic') {
    const subtopic = await Subtopic.findById(scopeId);
    if (!subtopic) return;

    // Mark current subtopic completed
    await Progress.findOneAndUpdate(
      { studentId, chapterId: subtopic.chapterId, subtopicId: subtopic._id },
      { status: 'completed', completedAt: new Date() },
      { upsert: true, new: true }
    );

    // Unlock next subtopic in chapter if exists
    const nextSubtopic = await Subtopic.findOne({
      chapterId: subtopic.chapterId,
      order: subtopic.order + 1
    });

    if (nextSubtopic) {
      await Progress.findOneAndUpdate(
        { studentId, chapterId: subtopic.chapterId, subtopicId: nextSubtopic._id },
        { status: 'in-progress', unlockedAt: new Date() },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }
  } else if (scopeType === 'chapter') {
    const chapter = await Chapter.findById(scopeId);
    if (!chapter) return;

    // Mark chapter final completed (subtopicId: null)
    await Progress.findOneAndUpdate(
      { studentId, chapterId: chapter._id, subtopicId: null },
      { status: 'completed', completedAt: new Date() },
      { upsert: true, new: true }
    );

    // Unlock first subtopic of next chapter
    const nextChapter = await Chapter.findOne({
      courseId: chapter.courseId,
      order: chapter.order + 1
    });

    if (nextChapter) {
      const firstSubtopicOfNext = await Subtopic.findOne({
        chapterId: nextChapter._id,
        order: 1
      });

      if (firstSubtopicOfNext) {
        await Progress.findOneAndUpdate(
          { studentId, chapterId: nextChapter._id, subtopicId: firstSubtopicOfNext._id },
          { status: 'in-progress', unlockedAt: new Date() },
          { upsert: true, setDefaultsOnInsert: true }
        );
      }
    }
  } else if (scopeType === 'course') {
    // Course final passed - mark course completion record
    await Progress.findOneAndUpdate(
      { studentId, chapterId: null, subtopicId: null },
      { status: 'completed', completedAt: new Date() },
      { upsert: true, new: true }
    );
  }
};
