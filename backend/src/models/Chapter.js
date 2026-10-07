import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },
    order: {
      type: Number,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    estimatedHours: {
      type: Number,
      default: 4
    }
  },
  {
    timestamps: true
  }
);

export const Chapter = mongoose.model('Chapter', chapterSchema);
