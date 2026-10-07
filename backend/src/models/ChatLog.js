import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema(
  {
    studentId: {
      type: String, // Firebase UID
      required: true,
      index: true
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
      index: true
    },
    query: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: true
    },
    retrievedChunks: [
      {
        chunkId: String,
        subtopicId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subtopic'
        },
        score: Number,
        previewText: String
      }
    ],
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

export const ChatLog = mongoose.model('ChatLog', chatLogSchema);
