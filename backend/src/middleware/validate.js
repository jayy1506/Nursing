/**
 * Zod Request Validation Middleware
 * Validates req.body, req.query, or req.params against Zod schemas
 */
export const validateBody = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const errorDetails = parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
        code: issue.code
      }));
      return res.status(400).json({
        success: false,
        error: 'Validation failed on request body',
        details: errorDetails
      });
    }
    req.body = parsed.data;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Validation execution error',
      details: err.message
    });
  }
};

export const validateQuery = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      const errorDetails = parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
        code: issue.code
      }));
      return res.status(400).json({
        success: false,
        error: 'Validation failed on query parameters',
        details: errorDetails
      });
    }
    req.query = parsed.data;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Validation execution error',
      details: err.message
    });
  }
};

export const validateParams = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      const errorDetails = parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
        code: issue.code
      }));
      return res.status(400).json({
        success: false,
        error: 'Validation failed on route parameters',
        details: errorDetails
      });
    }
    req.params = parsed.data;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Validation execution error',
      details: err.message
    });
  }
};
