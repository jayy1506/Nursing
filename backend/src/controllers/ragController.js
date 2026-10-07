import { queryChapterRAG, indexSubtopicContent } from '../services/ragService.js';
import { ChatLog } from '../models/ChatLog.js';
import { Subtopic } from '../models/Subtopic.js';
import { Chapter } from '../models/Chapter.js';
import { User } from '../models/User.js';

// Student endpoint: Ask a question scoped strictly to current chapter
export const chatWithChapterTutor = async (req, res) => {
  try {
    const { chapterId, query } = req.body;
    const studentId = req.user.uid;

    if (!chapterId || !query) {
      return res.status(400).json({
        success: false,
        error: 'chapterId and query are required in request body.'
      });
    }

    const result = await queryChapterRAG({ studentId, chapterId, query });

    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('[RAG Controller Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process clinical query',
      details: error.message
    });
  }
};

// Admin & Faculty endpoint: Get audit logs of all student chat interactions
export const getChatAuditLogs = async (req, res) => {
  try {
    const { studentId, chapterId } = req.query;
    const filter = {};

    if (studentId) filter.studentId = studentId;
    if (chapterId) filter.chapterId = chapterId;

    const logs = await ChatLog.find(filter)
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    // Enhance logs with student names and chapter titles
    const enhancedLogs = await Promise.all(
      logs.map(async (log) => {
        const user = await User.findOne({ firebaseUid: log.studentId }).lean();
        const chapter = await Chapter.findById(log.chapterId).lean();
        return {
          ...log,
          studentName: user ? user.name : 'Unknown Student',
          studentEmail: user ? user.email : '',
          chapterTitle: chapter ? `Ch ${chapter.order}: ${chapter.title}` : 'General'
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: enhancedLogs.length,
      logs: enhancedLogs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve chat audit logs',
      details: error.message
    });
  }
};

// Admin & Faculty endpoint: Reindex all subtopic content into vector store
export const reindexAllContent = async (req, res) => {
  try {
    const subtopics = await Subtopic.find();
    let reindexedCount = 0;

    for (const sub of subtopics) {
      await indexSubtopicContent(sub.chapterId, sub._id, sub.title, sub.contentBody);
      reindexedCount++;
    }

    return res.status(200).json({
      success: true,
      message: `Successfully re-indexed ${reindexedCount} subtopics into vector database.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to reindex content',
      details: error.message
    });
  }
};
