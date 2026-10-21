import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: String, // Firebase UID
      required: true,
      index: true
    },
    studentName: {
      type: String,
      default: 'Nursing Student'
    },
    studentEmail: {
      type: String,
      default: ''
    },
    scopeType: {
      type: String,
      enum: ['subtopic', 'chapter', 'course'],
      required: true,
      index: true
    },
    scopeId: {
      type: String, // String topicId (e.g. phys-unit-1) or ObjectId
      required: true,
      index: true
    },
    topicTitle: {
      type: String,
      default: ''
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
    timeSpentSeconds: {
      type: Number,
      default: 0
    },
    answers: [
      {
        questionId: {
          type: String,
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
