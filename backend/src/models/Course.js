import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: 'NUR-101'
    }
  },
  {
    timestamps: true
  }
);

export const Course = mongoose.model('Course', courseSchema);
