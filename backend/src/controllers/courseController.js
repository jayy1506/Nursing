import { Course } from '../models/Course.js';
import { Chapter } from '../models/Chapter.js';
import { Subtopic } from '../models/Subtopic.js';
import { Progress } from '../models/Progress.js';
import { indexSubtopicContent } from '../services/ragService.js';
import { ensureStudentProgressInitialized } from '../services/gatingService.js';

// Get course hierarchy with student progression status
export const getFullCourseHierarchy = async (req, res) => {
  try {
    const course = await Course.findOne();
    if (!course) {
      return res.status(404).json({ success: false, error: 'No course found.' });
    }

    const chapters = await Chapter.find({ courseId: course._id }).sort({ order: 1 }).lean();
    const chapterIds = chapters.map((c) => c._id);

    const subtopics = await Subtopic.find({ chapterId: { $in: chapterIds } }).sort({ order: 1 }).lean();

    let studentProgressMap = {};

    // If student, calculate their unlock/completion states
    if (req.user && req.user.role === 'student') {
      await ensureStudentProgressInitialized(req.user.uid);

      const progressRecords = await Progress.find({
        studentId: req.user.uid
      }).lean();

      progressRecords.forEach((p) => {
        const key = p.subtopicId ? `${p.chapterId}_${p.subtopicId}` : `${p.chapterId}_final`;
        studentProgressMap[key] = p.status;
      });
    }

    // Assemble structure
    const chaptersWithSubtopics = chapters.map((ch, chIdx) => {
      const chSubtopics = subtopics
        .filter((s) => s.chapterId.toString() === ch._id.toString())
        .map((s, sIdx) => {
          let status = 'unlocked'; // Default for admin/faculty
          if (req.user && req.user.role === 'student') {
            const key = `${ch._id}_${s._id}`;
            status = studentProgressMap[key] || (chIdx === 0 && sIdx === 0 ? 'in-progress' : 'locked');
          }
          return {
            ...s,
            status
          };
        });

      let finalExamStatus = 'unlocked';
      if (req.user && req.user.role === 'student') {
        const key = `${ch._id}_final`;
        const allSubsCompleted = chSubtopics.every((s) => s.status === 'completed');
        status = studentProgressMap[key] || (allSubsCompleted ? 'in-progress' : 'locked');
        finalExamStatus = status;
      }

      return {
        ...ch,
        subtopics: chSubtopics,
        finalExamStatus
      };
    });

    return res.status(200).json({
      success: true,
      course,
      chapters: chaptersWithSubtopics
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve course hierarchy',
      details: error.message
    });
  }
};

// Get single chapter details with its subtopics
export const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id).lean();
    if (!chapter) {
      return res.status(404).json({ success: false, error: 'Chapter not found' });
    }

    const subtopics = await Subtopic.find({ chapterId: id }).sort({ order: 1 }).lean();

    return res.status(200).json({
      success: true,
      chapter: {
        ...chapter,
        subtopics
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve chapter',
      details: error.message
    });
  }
};

// Get single subtopic
export const getSubtopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const subtopic = await Subtopic.findById(id).lean();
    if (!subtopic) {
      return res.status(404).json({ success: false, error: 'Subtopic not found' });
    }

    const chapter = await Chapter.findById(subtopic.chapterId).lean();

    return res.status(200).json({
      success: true,
      subtopic,
      chapter
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve subtopic',
      details: error.message
    });
  }
};

// Admin/Faculty: Create or update a subtopic
export const upsertSubtopic = async (req, res) => {
  try {
    const { id } = req.params; // If present, update; else create
    const { chapterId, order, title, contentBody, summary, clinicalPearls } = req.body;

    if (!title || !contentBody || !chapterId) {
      return res.status(400).json({
        success: false,
        error: 'title, contentBody, and chapterId are required.'
      });
    }

    let subtopic;
    if (id) {
      subtopic = await Subtopic.findByIdAndUpdate(
        id,
        { chapterId, order, title, contentBody, summary, clinicalPearls },
        { new: true, runValidators: true }
      );
    } else {
      const maxOrderSub = await Subtopic.findOne({ chapterId }).sort({ order: -1 });
      const nextOrder = order || (maxOrderSub ? maxOrderSub.order + 1 : 1);

      subtopic = await Subtopic.create({
        chapterId,
        order: nextOrder,
        title,
        contentBody,
        summary,
        clinicalPearls: clinicalPearls || []
      });
    }

    // Automatically trigger vector indexing for RAG chatbot
    try {
      await indexSubtopicContent(chapterId, subtopic._id, title, contentBody);
      console.log(`[RAG Indexer] Re-indexed chunks for subtopic: ${title}`);
    } catch (embErr) {
      console.warn(`[RAG Indexer] Warning while indexing: ${embErr.message}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Subtopic saved and re-indexed into RAG vector store successfully.',
      subtopic
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to save subtopic',
      details: error.message
    });
  }
};

// Admin/Faculty: Create or update chapter
export const upsertChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId, order, title, description, estimatedHours } = req.body;

    let chapter;
    if (id) {
      chapter = await Chapter.findByIdAndUpdate(
        id,
        { order, title, description, estimatedHours },
        { new: true }
      );
    } else {
      const parentCourse = courseId ? await Course.findById(courseId) : await Course.findOne();
      const count = await Chapter.countDocuments();
      chapter = await Chapter.create({
        courseId: parentCourse._id,
        order: order || count + 1,
        title,
        description,
        estimatedHours: estimatedHours || 4
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Chapter saved successfully',
      chapter
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to save chapter',
      details: error.message
    });
  }
};
