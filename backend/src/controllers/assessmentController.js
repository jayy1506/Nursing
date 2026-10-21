import mongoose from 'mongoose';
import { Question } from '../models/Question.js';
import { Attempt } from '../models/Attempt.js';
import { Chapter } from '../models/Chapter.js';
import { Subtopic } from '../models/Subtopic.js';
import { Course } from '../models/Course.js';
import { User } from '../models/User.js';
import {
  verifySubtopicAccess,
  verifyChapterFinalAccess,
  verifyCourseFinalAccess,
  handleAssessmentPassed,
  PASSING_PERCENTAGE
} from '../services/gatingService.js';

// Get questions for a quiz/exam with server-side gating enforcement
export const getAssessmentQuestions = async (req, res) => {
  try {
    const { scopeType, scopeId } = req.params;

    if (!['subtopic', 'chapter', 'course'].includes(scopeType)) {
      return res.status(400).json({ success: false, error: 'Invalid scopeType' });
    }

    // 1. Verify progression gating for students
    if (req.user.role === 'student') {
      if (scopeType === 'subtopic') {
        const check = await verifySubtopicAccess(req.user.uid, scopeId);
        if (!check.allowed) {
          return res.status(403).json({ success: false, error: check.reason });
        }
      } else if (scopeType === 'chapter') {
        const check = await verifyChapterFinalAccess(req.user.uid, scopeId);
        if (!check.allowed) {
          return res.status(403).json({
            success: false,
            error: check.reason,
            missingCount: check.missingCount
          });
        }
      } else if (scopeType === 'course') {
        const check = await verifyCourseFinalAccess(req.user.uid, scopeId);
        if (!check.allowed) {
          return res.status(403).json({
            success: false,
            error: check.reason,
            missingCount: check.missingCount
          });
        }
      }
    }

    // 2. Fetch questions
    let queryFilter = { scopeType };
    if (scopeType === 'course') {
      queryFilter = { scopeType: 'course' };
    } else {
      queryFilter.scopeId = scopeId;
    }

    let questions = await Question.find(queryFilter).lean();

    // If chapter final has few direct questions, also pull representative subtopic questions
    if (scopeType === 'chapter' && questions.length < 5) {
      const subtopics = await Subtopic.find({ chapterId: scopeId });
      const subtopicIds = subtopics.map((s) => s._id);
      const subtopicQuestions = await Question.find({
        scopeType: 'subtopic',
        scopeId: { $in: subtopicIds }
      }).limit(10).lean();
      questions = [...questions, ...subtopicQuestions];
    }

    // If course final has few direct questions, sample from all chapters
    if (scopeType === 'course' && questions.length < 10) {
      const allQuestions = await Question.find().limit(20).lean();
      questions = allQuestions;
    }

    // For students: sanitize out answers & explanations to prevent cheating
    const isElevated = ['admin', 'faculty'].includes(req.user.role);
    const sanitizedQuestions = questions.map((q) => {
      if (isElevated) {
        return q;
      }
      const { answer, explanation, ...studentView } = q;
      return studentView;
    });

    // Fetch scope title
    let scopeTitle = 'Assessment';
    if (scopeType === 'subtopic') {
      const sub = await Subtopic.findById(scopeId);
      if (sub) scopeTitle = sub.title;
    } else if (scopeType === 'chapter') {
      const ch = await Chapter.findById(scopeId);
      if (ch) scopeTitle = `Chapter ${ch.order}: ${ch.title} (Final Exam)`;
    } else if (scopeType === 'course') {
      scopeTitle = 'Comprehensive NCLEX Course Final';
    }

    return res.status(200).json({
      success: true,
      scopeType,
      scopeId,
      scopeTitle,
      passingPercentage: PASSING_PERCENTAGE,
      questions: sanitizedQuestions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve assessment questions',
      details: error.message
    });
  }
};

// Submit assessment attempt with server-side validation and progress progression
export const submitAssessmentAttempt = async (req, res) => {
  try {
    const { scopeType, scopeId, answers, score, totalQuestions: reqTotal, percentage: reqPercentage, passed: reqPassed, topicTitle, timeSpentSeconds } = req.body;
    const studentId = req.user.uid || req.user.email || 'student';

    if (!scopeType || !scopeId || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: 'scopeType, scopeId, and answers array are required.'
      });
    }

    // 1. Verify gating on server only if scopeId is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(scopeId)) {
      if (scopeType === 'subtopic') {
        const check = await verifySubtopicAccess(studentId, scopeId);
        if (!check.allowed) {
          return res.status(403).json({ success: false, error: check.reason });
        }
      } else if (scopeType === 'chapter') {
        const check = await verifyChapterFinalAccess(studentId, scopeId);
        if (!check.allowed) {
          return res.status(403).json({ success: false, error: check.reason });
        }
      } else if (scopeType === 'course') {
        const check = await verifyCourseFinalAccess(studentId, scopeId);
        if (!check.allowed) {
          return res.status(403).json({ success: false, error: check.reason });
        }
      }
    }

    // 2. Fetch all relevant questions from database if they are valid ObjectIds
    const questionIds = answers.map((a) => a.questionId);
    const validQuestionObjectIds = questionIds.filter((id) => mongoose.Types.ObjectId.isValid(id));
    const questions = validQuestionObjectIds.length > 0 
      ? await Question.find({ _id: { $in: validQuestionObjectIds } }).lean() 
      : [];
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    let correctCount = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const q = questionMap.get(String(ans.questionId));
      if (!q) {
        const isClientCorrect = Boolean(ans.isCorrect);
        if (isClientCorrect) correctCount++;
        return {
          questionId: String(ans.questionId),
          selectedOption: ans.selectedOption,
          correctOption: ans.correctOption,
          isCorrect: isClientCorrect
        };
      }

      const isCorrect = Number(ans.selectedOption) === Number(q.answer);
      if (isCorrect) correctCount++;

      return {
        questionId: String(q._id),
        selectedOption: ans.selectedOption,
        correctOption: q.answer,
        isCorrect,
        explanation: q.explanation,
        questionText: q.text,
        options: q.options
      };
    });

    const totalQuestions = reqTotal || answers.length || 1;
    const finalScore = (questions.length === 0 && typeof score === 'number') ? score : correctCount;
    const percentage = (questions.length === 0 && typeof reqPercentage === 'number') 
      ? reqPercentage 
      : Number(((finalScore / totalQuestions) * 100).toFixed(1));
    const passed = (questions.length === 0 && typeof reqPassed === 'boolean') 
      ? reqPassed 
      : percentage >= PASSING_PERCENTAGE;

    // 3. Store the attempt in MongoDB
    const attempt = await Attempt.create({
      studentId: String(studentId),
      studentName: req.body.studentName || req.user.name || 'Nursing Student',
      studentEmail: req.body.studentEmail || req.user.email || '',
      scopeType,
      scopeId: String(scopeId),
      topicTitle: topicTitle || '',
      score: finalScore,
      totalQuestions,
      percentage,
      passed,
      timeSpentSeconds: timeSpentSeconds || 0,
      answers: evaluatedAnswers.map((a) => ({
        questionId: String(a.questionId),
        selectedOption: typeof a.selectedOption === 'number' ? a.selectedOption : 0,
        correctOption: a.correctOption,
        isCorrect: a.isCorrect
      })),
      timestamp: new Date()
    });

    // 4. If passed and valid ObjectId, advance progression state
    if (passed && mongoose.Types.ObjectId.isValid(scopeId)) {
      await handleAssessmentPassed(studentId, scopeType, scopeId);
    }

    return res.status(200).json({
      success: true,
      attemptId: attempt._id,
      score: finalScore,
      totalQuestions,
      percentage,
      passed,
      passingThreshold: PASSING_PERCENTAGE,
      feedback: passed
        ? 'Congratulations! You passed this assessment and unlocked the next phase.'
        : `Score is below ${PASSING_PERCENTAGE}%. Please review the clinical explanations below and try again.`,
      breakdown: evaluatedAnswers
    });
  } catch (error) {
    console.error('[Submit Assessment Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit assessment',
      details: error.message
    });
  }
};

// Get attempts history
export const getAttemptsHistory = async (req, res) => {
  try {
    const { studentId, scopeType, scopeId } = req.query;
    const filter = {};

    if (req.user.role === 'student') {
      filter.studentId = req.user.uid;
    } else if (studentId) {
      filter.studentId = studentId;
    }

    if (scopeType) filter.scopeType = scopeType;
    if (scopeId) filter.scopeId = scopeId;

    const attempts = await Attempt.find(filter)
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    // Enhance attempts with student name and scope names for faculty/admin view
    const enhancedAttempts = await Promise.all(
      attempts.map(async (att) => {
        let studentName = att.studentName || 'Nursing Student';
        let studentEmail = att.studentEmail || '';

        if ((!studentName || studentName === 'Nursing Student') && att.studentId) {
          const user = await User.findOne({
            $or: [
              { firebaseUid: att.studentId },
              { email: att.studentId },
              ...(mongoose.Types.ObjectId.isValid(att.studentId) ? [{ _id: att.studentId }] : [])
            ]
          }).lean();
          if (user) {
            studentName = user.name || studentName;
            studentEmail = user.email || studentEmail;
          }
        }

        let scopeName = att.topicTitle || 'Assessment';
        if (mongoose.Types.ObjectId.isValid(att.scopeId)) {
          if (att.scopeType === 'subtopic') {
            const sub = await Subtopic.findById(att.scopeId).lean();
            if (sub) scopeName = sub.title;
          } else if (att.scopeType === 'chapter') {
            const ch = await Chapter.findById(att.scopeId).lean();
            if (ch) scopeName = `Chapter ${ch.order}: ${ch.title}`;
          } else if (att.scopeType === 'course') {
            scopeName = 'Comprehensive Course Final';
          }
        } else if (!att.topicTitle && att.scopeId) {
          scopeName = String(att.scopeId);
        }

        return {
          ...att,
          studentName,
          studentEmail,
          scopeName
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: enhancedAttempts.length,
      attempts: enhancedAttempts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve assessment history',
      details: error.message
    });
  }
};

// Admin & Faculty: Add / Edit a question
export const upsertQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { scopeType, scopeId, text, options, answer, explanation, difficulty } = req.body;

    if (!scopeType || !scopeId || !text || !Array.isArray(options) || answer === undefined) {
      return res.status(400).json({
        success: false,
        error: 'scopeType, scopeId, text, options array, and answer index are required.'
      });
    }

    let question;
    if (id) {
      question = await Question.findByIdAndUpdate(
        id,
        { scopeType, scopeId, text, options, answer, explanation, difficulty },
        { new: true }
      );
    } else {
      question = await Question.create({
        scopeType,
        scopeId,
        text,
        options,
        answer,
        explanation,
        difficulty: difficulty || 'medium'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Question saved successfully.',
      question
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to save question',
      details: error.message
    });
  }
};

// Admin & Faculty: Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: 'Question deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to delete question',
      details: error.message
    });
  }
};
