import mongoose from 'mongoose';

const semanticMemorySchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    normalizedQuery: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    vector: {
      type: [Number],
      default: []
    },
    response: {
      type: String,
      required: true
    },
    model: {
      type: String,
      default: 'gpt-3.5-turbo'
    },
    promptTokens: {
      type: Number,
      default: 0
    },
    completionTokens: {
      type: Number,
      default: 0
    },
    totalTokens: {
      type: Number,
      default: 350
    },
    tokensSaved: {
      type: Number,
      default: 0
    },
    hitCount: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: 'General'
    },
    askedBy: {
      uid: { type: String, default: 'anonymous' },
      name: { type: String, default: 'Student Learner' },
      email: { type: String, default: '' }
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Index for compound lookup and sorting
semanticMemorySchema.index({ normalizedQuery: 1, lastAccessedAt: -1 });
semanticMemorySchema.index({ hitCount: -1 });

export const SemanticMemory = mongoose.model('SemanticMemory', semanticMemorySchema);
export default SemanticMemory;
