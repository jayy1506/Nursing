import {
  queryWithOpenAITokenSaver,
  getMemoryTokenStats,
  getRecentMemories,
  clearMemoryCache,
  findSimilarQueryInMemory
} from '../services/semanticMemoryService.js';

/**
 * Handle student/user search query with OpenAI token saving memory engine
 */
export const handleAIQuery = async (req, res) => {
  try {
    const { query, category, forceRefresh, apiKey } = req.body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required.'
      });
    }

    const user = req.user || {
      uid: 'guest_user',
      name: 'Student Learner',
      email: ''
    };

    const result = await queryWithOpenAITokenSaver({
      query: query.trim(),
      category: category || 'General',
      customApiKey: apiKey,
      user,
      forceRefresh: Boolean(forceRefresh)
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('[AI Memory Controller Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process AI query',
      details: error.message
    });
  }
};

/**
 * Check if a similar query exists in memory before sending (preview similarity)
 */
export const checkMemorySimilarity = async (req, res) => {
  try {
    const { query, threshold } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query is required' });
    }

    const numThreshold = threshold ? parseFloat(threshold) : undefined;
    const match = await findSimilarQueryInMemory(query, numThreshold);

    return res.status(200).json({
      success: true,
      query,
      ...match
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get aggregated token savings & memory metrics
 */
export const getStats = async (req, res) => {
  try {
    const stats = await getMemoryTokenStats();
    return res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get cached queries stored in memory
 */
export const getEntries = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 30;
    const entries = await getRecentMemories(limit);
    return res.status(200).json({
      success: true,
      count: entries.length,
      entries
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Clear memory cache (useful for testing and reset)
 */
export const clearCache = async (req, res) => {
  try {
    const result = await clearMemoryCache();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
