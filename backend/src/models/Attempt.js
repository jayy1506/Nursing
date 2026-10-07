import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: String, // Firebase UID
      required: true,
      index: true
    },
    scopeType: {
      type: String,
      enum: ['subtopic', 'chapter', 'course'],
      required: true,
      index: true
    },
    scopeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    score: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    passed: {
      type: Boolean,
      required: true
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
          required: true
        },
        selectedOption: {
          type: Number,
          required: true
        },
        correctOption: {
          type: Number
        },
        isCorrect: {
          type: Boolean,
          required: true
        }
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

export const Attempt = mongoose.model('Attempt', attemptSchema);
