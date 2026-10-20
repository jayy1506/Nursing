import mongoose from 'mongoose';

const contentEmbeddingSchema = new mongoose.Schema(
  {
    chunkId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
      index: true
    },
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subtopic',
      required: true,
      index: true
    },
    sectionTitle: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    vector: {
      type: [Number],
      required: true
    },
    keywords: {
      type: [String],
      default: [],
      index: true
    },
    tokens: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const ContentEmbedding = mongoose.model('ContentEmbedding', contentEmbeddingSchema);
