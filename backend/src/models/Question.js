import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
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
    text: {
      type: String,
      required: true,
      trim: true
    },
    options: [{
      type: String,
      required: true
    }],
    answer: {
      type: Number, // 0-based index into options array
      required: true
    },
    explanation: {
      type: String,
      default: ''
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    }
  },
  {
    timestamps: true
  }
);

export const Question = mongoose.model('Question', questionSchema);
