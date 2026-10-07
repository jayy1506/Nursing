import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    password: {
      type: String,
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      default: 'student',
      index: true
    },
    collegeId: {
      type: String,
      default: 'COLLEGE_001'
    },
    firebaseUid: {
      type: String,
      sparse: true,
      index: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active'
    },
    isDefaultPassword: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: String,
      default: 'system'
    }
  },
  {
    timestamps: true
  }
);

// Auto-hash password before saving if modified
userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password helper
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sanitize user object (exclude password)
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

export const User = mongoose.model('User', userSchema);
export default User;
