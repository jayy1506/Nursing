import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    studentId: {
      type: String, // Firebase UID
      required: true,
      index: true
    },
    unitKey: {
      type: String, // e.g. 'phys-unit-1', 'biochem-unit-2', 'classification-of-carb'
      default: null,
      index: true
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      default: null,
      index: true
    },
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subtopic',
      default: null,
      index: true
    },
    status: {
      type: String,
      enum: ['locked', 'in-progress', 'completed'],
      default: 'locked',
      index: true
    },
    unlockedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast lookup of student progress
progressSchema.index({ studentId: 1, chapterId: 1, subtopicId: 1 }, { unique: true, sparse: true });
progressSchema.index({ studentId: 1, unitKey: 1 }, { unique: true, sparse: true });

export const Progress = mongoose.model('Progress', progressSchema);
