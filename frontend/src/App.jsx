import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Auth Pages (Lazy Loaded)
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));

// Core Student Pages (Lazy Loaded)
const Home = lazy(() => import('./pages/Home'));
const SyllabusHub = lazy(() => import('./pages/SyllabusHub'));
const BioChemistrySyllabus = lazy(() => import('./pages/BioChemistrySyllabus'));
const NutritionSyllabus = lazy(() => import('./pages/NutritionSyllabus'));
const NutritionLessonView = lazy(() => import('./pages/NutritionPages/NutritionLessonView'));
const QuestionBankView = lazy(() => import('./pages/QuestionBankView'));
const QuizView = lazy(() => import('./pages/student/QuizView'));
const StudentResults = lazy(() => import('./pages/student/StudentResults'));

// Admin Pages (Lazy Loaded)
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ContentEditor = lazy(() => import('./pages/admin/ContentEditor'));
const ResultAudit = lazy(() => import('./pages/admin/ResultAudit'));
const ChatLogsView = lazy(() => import('./pages/admin/ChatLogsView'));

// Faculty Pages (Lazy Loaded)
const FacultyDashboard = lazy(() => import('./pages/faculty/FacultyDashboard'));
const FacultyQuestions = lazy(() => import('./pages/faculty/FacultyQuestions'));
const FacultyResults = lazy(() => import('./pages/faculty/FacultyResults'));

// Module 1 Pages (Lazy Loaded)
const ClassificationOfCarb = lazy(() => import('./pages/BioChemistryPages/Module1/ClassificationOfCarb'));
const DigestionOfCarb = lazy(() => import('./pages/BioChemistryPages/Module1/DigestionOfCarb'));
const AbsorptionOfCarb = lazy(() => import('./pages/BioChemistryPages/Module1/AbsorptionOfCarb'));
const MetabolicPathwaysOfCarb = lazy(() => import('./pages/BioChemistryPages/Module1/MetabolicPathwayOfCarb'));
const DisordersOfCarb = lazy(() => import('./pages/BioChemistryPages/Module1/DisordersOfCarb'));
const RegulationOfBloodGlucose = lazy(() => import('./pages/BioChemistryPages/Module1/RegulationOfBloodGlucose'));
const DiabetesMellitusType1 = lazy(() => import('./pages/BioChemistryPages/Module1/DiabetesMellitusType1'));
const DiabetesMellitusType2 = lazy(() => import('./pages/BioChemistryPages/Module1/DiabetesMellitusType2'));

// Module 2 Pages (Lazy Loaded)
const FattyAcidsClassification = lazy(() => import('./pages/BioChemistryPages/Module2/FattyAcidsClassification'));
const MUFA = lazy(() => import('./pages/BioChemistryPages/Module2/MUFA'));
const PUFA = lazy(() => import('./pages/BioChemistryPages/Module2/PUFA'));
const EssentialFattyAcids = lazy(() => import('./pages/BioChemistryPages/Module2/EssentialFattyAcids'));

import AIWidget from './components/AIWidget';
import ForceChangePasswordModal from './components/auth/ForceChangePasswordModal';

// Clean Minimal Page Loading Skeleton
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
    <div className="w-10 h-10 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3" />
    <span className="text-xs font-bold text-slate-500 tracking-wide animate-pulse">Loading curriculum...</span>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  // Hide AI Tutor on login and signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const showAIWidget = currentUser && !isAuthPage;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Mandatory Password Change Popup on First Login */}
      <ForceChangePasswordModal />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Navigate to="/login" replace />} />

          {/* Student Learning & Assessment Routes (Accessible to student, faculty, admin) */}
          <Route element={<ProtectedRoute allowedRoles={['student', 'faculty', 'admin']} />}>
            <Route path="/" element={<Home />} />
            <Route path="/syllabus" element={<SyllabusHub />} />
            <Route path="/curriculum" element={<Navigate to="/syllabus" replace />} />
            <Route path="/bio-chem-syllabus" element={<BioChemistrySyllabus />} />
            <Route path="/nutrition-syllabus" element={<NutritionSyllabus />} />
            <Route path="/nutrition/lesson/:submoduleSlug" element={<NutritionLessonView />} />
            <Route path="/question-bank" element={<QuestionBankView />} />
            <Route path="/student/quiz/:topicId" element={<QuizView />} />
            <Route path="/student/results" element={<StudentResults />} />

            {/* Module 1 */}
            <Route path="/classification-of-carb" element={<ClassificationOfCarb />} />
            <Route path="/digestion-of-carb" element={<DigestionOfCarb />} />
            <Route path="/absorption-of-carb" element={<AbsorptionOfCarb />} />
            <Route path="/MetabolicPathwaysOfCarb" element={<MetabolicPathwaysOfCarb />} />
            <Route path="/DisordersOfCarb" element={<DisordersOfCarb />} />
            <Route path="/RegulationOfBloodGlucose" element={<RegulationOfBloodGlucose />} />
            <Route path="/DiabetesMellitusType1" element={<DiabetesMellitusType1 />} />
            <Route path="/DiabetesMellitusType2" element={<DiabetesMellitusType2 />} />

            {/* Module 2 */}
            <Route path="/FattyAcidsClassification" element={<FattyAcidsClassification />} />
            <Route path="/MUFA" element={<MUFA />} />
            <Route path="/PUFA" element={<PUFA />} />
            <Route path="/EssentialFattyAcids" element={<EssentialFattyAcids />} />
          </Route>

          {/* Faculty Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['faculty', 'admin']} />}>
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/questions" element={<FacultyQuestions />} />
            <Route path="/faculty/results" element={<FacultyResults />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/content" element={<ContentEditor />} />
            <Route path="/admin/results" element={<ResultAudit />} />
            <Route path="/admin/chat-logs" element={<ChatLogsView />} />
          </Route>

          {/* Fallback Catch-all -> Redirect to Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>

      {/* Global AI Clinical Tutor */}
      {showAIWidget && <AIWidget />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
