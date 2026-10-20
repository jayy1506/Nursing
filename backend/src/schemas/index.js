import { z } from 'zod';

// ================= Auth Schemas =================
export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'A valid email address is required.' }),
  password: z.string().min(1, { message: 'Password is required.' })
});

export const signupSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().trim().email({ message: 'A valid email address is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }).optional(),
  role: z.enum(['student', 'faculty', 'admin']).optional().default('student'),
  collegeId: z.string().trim().optional().default('COLLEGE_001'),
  firebaseUid: z.string().trim().optional()
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required.' }),
  newPassword: z.string().min(6, { message: 'New password must be at least 6 characters long.' })
});

// ================= RAG Schemas =================
export const ragQuerySchema = z.object({
  chapterId: z.string().trim().min(1, { message: 'chapterId is required.' }),
  query: z.string().trim().min(2, { message: 'Query must be at least 2 characters.' }).max(1500, { message: 'Query cannot exceed 1500 characters.' }),
  mode: z.enum(['default', 'simple', 'quiz', 'case']).optional().default('default')
});

// ================= User Management Schemas =================
export const createUserSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().trim().email({ message: 'A valid email address is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['student', 'faculty', 'admin'], { errorMap: () => ({ message: 'Role must be student, faculty, or admin.' }) })
});

export const updateUserStatusSchema = z.object({
  status: z.enum(['active', 'disabled'], { errorMap: () => ({ message: 'Status must be active or disabled.' }) })
});
