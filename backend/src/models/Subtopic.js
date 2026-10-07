import mongoose from 'mongoose';

const subtopicSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
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
    contentBody: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      default: ''
    },
    clinicalPearls: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
);

export const Subtopic = mongoose.model('Subtopic', subtopicSchema);
