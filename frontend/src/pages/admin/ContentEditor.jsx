import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import apiClient from '../../api/client';
import {
  BookOpen,
  PlusCircle,
  Trash2,
  Edit3,
  HelpCircle,
  CheckCircle2,
  FolderPlus,
  Layers,
  Sparkles,
  AlertCircle,
  UploadCloud,
  FileText,
  Database,
  Check,
  XCircle
} from 'lucide-react';

export const ContentEditor = () => {
  // Modules / Subjects state from persistent storage
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem('nursing_curriculum_subjects');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'module-1', name: 'Module 1: Carbohydrate Metabolism', topicsCount: 8 },
      { id: 'module-2', name: 'Module 2: Lipid Metabolism', topicsCount: 7 }
    ];
  });

  // Questions state from persistent storage
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('nursing_curriculum_questions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'q1',
        moduleId: 'module-1',
        moduleName: 'Carbohydrate Metabolism',
        text: 'Which transporter moves glucose and galactose into enterocytes via secondary active transport with sodium?',
        options: ['GLUT-2', 'SGLT-1', 'GLUT-4', 'GLUT-5'],
        correctAnswer: 1, // SGLT-1
        rationale: 'SGLT-1 utilizes the electrochemical sodium gradient created by Na+/K+ ATPase to import glucose and galactose against their concentration gradient.',
        difficulty: 'Medium'
      },
      {
        id: 'q2',
        moduleId: 'module-1',
        moduleName: 'Carbohydrate Metabolism',
        text: 'What is the primary diagnostic threshold for fasting plasma glucose in Diabetes Mellitus?',
        options: ['≥ 100 mg/dL', '≥ 126 mg/dL', '≥ 140 mg/dL', '≥ 200 mg/dL'],
        correctAnswer: 1, // ≥ 126 mg/dL
        rationale: 'According to ADA guidelines, fasting plasma glucose ≥ 126 mg/dL on two separate occasions confirms diabetes mellitus.',
        difficulty: 'Easy'
      },
      {
        id: 'q3',
        moduleId: 'module-2',
        moduleName: 'Lipid Metabolism',
        text: 'Which of the following is an example of a Monounsaturated Fatty Acid (MUFA)?',
        options: ['Oleic acid (18:1)', 'Linoleic acid (18:2)', 'Palmitic acid (16:0)', 'Stearic acid (18:0)'],
        correctAnswer: 0, // Oleic acid
        rationale: 'Oleic acid contains a single double bond at carbon 9 (cis-9-octadecenoic acid), making it the most abundant MUFA.',
        difficulty: 'Hard'
      }
    ];
  });

  // Keep saved to localStorage permanently
  React.useEffect(() => {
    localStorage.setItem('nursing_curriculum_subjects', JSON.stringify(subjects));
  }, [subjects]);

  React.useEffect(() => {
    localStorage.setItem('nursing_curriculum_questions', JSON.stringify(questions));
  }, [questions]);

  const [selectedModule, setSelectedModule] = useState('all');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  // Content Upload & Auto-Index Pipeline State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    chapterId: '',
    title: '',
    contentBody: '',
    summary: '',
    clinicalPearls: ''
  });

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await apiClient('/api/courses/hierarchy');
        if (res && res.success && res.courses?.[0]?.chapters) {
          const chList = res.courses[0].chapters;
          setChapters(chList);
          if (chList.length > 0) {
            setUploadForm((prev) => ({ ...prev, chapterId: prev.chapterId || chList[0]._id }));
          }
        }
      } catch (err) {
        console.warn('Failed to fetch chapters for upload pipeline:', err);
      }
    };
    fetchChapters();
  }, []);

  const handleUploadContent = async (e) => {
    e.preventDefault();
    if (!uploadForm.title.trim() || !uploadForm.contentBody.trim() || !uploadForm.chapterId) {
      setFeedback({ type: 'error', text: 'Please select a chapter, enter a title, and provide course content.' });
      return;
    }

    setUploadLoading(true);
    setUploadStats(null);

    try {
      const pearls = uploadForm.clinicalPearls
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean);

      const res = await apiClient('/api/courses/upload-content', {
        method: 'POST',
        body: JSON.stringify({
          chapterId: uploadForm.chapterId,
          title: uploadForm.title.trim(),
          contentBody: uploadForm.contentBody.trim(),
          summary: uploadForm.summary.trim(),
          clinicalPearls: pearls
        })
      });

      if (res && res.success) {
        setUploadStats(res.pipelineStats);
        setFeedback({
          type: 'success',
          text: `Successfully ingested "${uploadForm.title}". Created and indexed ${res.pipelineStats?.chunksIndexed} section-aware chunks into vector store.`
        });
        setUploadForm((prev) => ({
          ...prev,
          title: '',
          contentBody: '',
          summary: '',
          clinicalPearls: ''
        }));
      } else {
        setFeedback({
          type: 'error',
          text: res.error || 'Failed to upload and index material.'
        });
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Error executing upload pipeline' });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleContentFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result || '';
      setUploadForm((prev) => ({
        ...prev,
        contentBody: text,
        title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      }));
    };
    reader.readAsText(file);
  };

  // Question Form State
  const [questionForm, setQuestionForm] = useState({
    moduleId: 'module-1',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    rationale: '',
    difficulty: 'Medium'
  });

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;

    const newSub = {
      id: `module-${Date.now()}`,
      name: newSubjectName.trim(),
      topicsCount: 0
    };

    setSubjects((prev) => [...prev, newSub]);
    setNewSubjectName('');
    setShowSubjectModal(false);
    setFeedback({ type: 'success', text: `Subject "${newSub.name}" added successfully.` });
  };

  const handleDeleteSubject = (subId) => {
    if (window.confirm('Delete this subject and its associated questions?')) {
      setSubjects((prev) => prev.filter((s) => s.id !== subId));
      setQuestions((prev) => prev.filter((q) => q.moduleId !== subId));
      setFeedback({ type: 'success', text: 'Subject removed.' });
    }
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!questionForm.text.trim() || questionForm.options.some((opt) => !opt.trim())) {
      setFeedback({ type: 'error', text: 'Please complete question text and all 4 options.' });
      return;
    }

    const mod = subjects.find((s) => s.id === questionForm.moduleId);
    const newQ = {
      id: `q-${Date.now()}`,
      moduleId: questionForm.moduleId,
      moduleName: mod ? mod.name : 'General',
      text: questionForm.text.trim(),
      options: questionForm.options.map((o) => o.trim()),
      correctAnswer: Number(questionForm.correctAnswer),
      rationale: questionForm.rationale.trim(),
      difficulty: questionForm.difficulty
    };

    setQuestions((prev) => [newQ, ...prev]);
    setShowQuestionModal(false);
    setQuestionForm({
      moduleId: subjects[0]?.id || 'module-1',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      rationale: '',
      difficulty: 'Medium'
    });
    setFeedback({ type: 'success', text: 'New clinical assessment question added!' });
  };

  const handleDeleteQuestion = (qId) => {
    if (window.confirm('Are you sure you want to remove this question?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== qId));
      setFeedback({ type: 'success', text: 'Question deleted successfully.' });
    }
  };

  const filteredQuestions = questions.filter((q) => {
    return selectedModule === 'all' || q.moduleId === selectedModule;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <BookOpen className="w-7 h-7 text-emerald-600" />
              <span>Curriculum & Assessment Editor</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Author and organize clinical modules, subjects, question items, and rationale rubrics.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                setUploadStats(null);
                setShowUploadModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-emerald-400" />
              <span>Upload & Auto-Index Material</span>
            </button>
            <button
              onClick={() => setShowSubjectModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 text-emerald-600" />
              <span>Add Subject / Module</span>
            </button>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-400/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Assessment Question</span>
            </button>
          </div>
        </div>

        {/* Feedback alert */}
        {feedback.text && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Subjects / Modules Overview */}
        <div className="mb-8">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Active Subjects & Modules ({subjects.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className="bg-white/90 border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{sub.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {questions.filter((q) => q.moduleId === sub.id).length} Questions available
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteSubject(sub.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove Subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Questions Filter Bar */}
        <div className="bg-white/90 border border-slate-200 rounded-2xl p-4 shadow-sm mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">Filter by Module:</span>
          </div>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="all">All Modules ({questions.length} Questions)</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white/95 border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {q.moduleName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      {q.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-900 mb-3">{q.text}</p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                        optIdx === q.correctAnswer
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                          optIdx === q.correctAnswer
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                {/* Clinical Rationale */}
                {q.rationale && (
                  <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-xs text-sky-900">
                    <span className="font-bold">Clinical Rationale: </span>
                    <span>{q.rationale}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white/80 rounded-2xl border border-slate-200 text-slate-400 text-xs">
              No questions found for the selected module. Click "Add Assessment Question" to create one.
            </div>
          )}
        </div>

        {/* Modal: Add Subject */}
        {showSubjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-emerald-600" />
                  <span>New Subject / Module</span>
                </h3>
                <button
                  onClick={() => setShowSubjectModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSubject} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject Name</label>
                  <input
                    type="text"
                    required
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    placeholder="e.g. Module 3: Protein & Amino Acid Metabolism"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowSubjectModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-400/20 cursor-pointer"
                  >
                    Add Subject
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Question */}
        {showQuestionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 my-8">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-600" />
                  <span>Create Assessment Item</span>
                </h3>
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Subject / Module</label>
                  <select
                    value={questionForm.moduleId}
                    onChange={(e) => setQuestionForm({ ...questionForm, moduleId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Question Prompt</label>
                  <textarea
                    rows="3"
                    required
                    value={questionForm.text}
                    onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })}
                    placeholder="Enter the clinical scenario or biochemistry question..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Answer Choices</label>
                  <div className="space-y-2">
                    {questionForm.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={questionForm.correctAnswer === idx}
                          onChange={() => setQuestionForm({ ...questionForm, correctAnswer: idx })}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          title="Select as correct answer"
                        />
                        <span className="text-xs font-bold text-slate-600 w-4">
                          {String.fromCharCode(65 + idx)}:
                        </span>
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...questionForm.options];
                            newOpts[idx] = e.target.value;
                            setQuestionForm({ ...questionForm, options: newOpts });
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Select the radio button next to the correct answer choice.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Rationale & Explanation</label>
                  <textarea
                    rows="2"
                    value={questionForm.rationale}
                    onChange={(e) => setQuestionForm({ ...questionForm, rationale: e.target.value })}
                    placeholder="Explain why the correct answer is right and why others are incorrect..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowQuestionModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-400/20 cursor-pointer"
                  >
                    Save Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Upload & Auto-Index Material Pipeline Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">Curriculum Content & Auto-Index Pipeline</h2>
                    <p className="text-[11px] text-slate-500">Ingest lecture material, parse clinical sections, chunk & generate vector embeddings</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadContent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Course Chapter</label>
                    <select
                      value={uploadForm.chapterId}
                      onChange={(e) => setUploadForm({ ...uploadForm, chapterId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {chapters.map((ch) => (
                        <option key={ch._id} value={ch._id}>
                          Ch {ch.order}: {ch.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Lesson Title</label>
                    <input
                      type="text"
                      required
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      placeholder="e.g. Mechanical Ventilation & ARDS Nursing"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* File picker shortcut */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Upload markdown (.md) or text (.txt) file:</span>
                  </span>
                  <input
                    type="file"
                    accept=".md,.txt,text/plain,text/markdown"
                    onChange={handleContentFileUpload}
                    className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Content Body (Markdown or Text)</label>
                  <textarea
                    rows={8}
                    required
                    value={uploadForm.contentBody}
                    onChange={(e) => setUploadForm({ ...uploadForm, contentBody: e.target.value })}
                    placeholder="## Standard Precautions&#10;Infection prevention is the cornerstone of clinical safety...&#10;&#10;### Nursing Interventions&#10;1. Wash hands with soap and water&#10;2. Wear fitted N95 respirator"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500 font-medium leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Markdown headings (##, ###) will be detected automatically to generate section-aware chunks and citations.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Pearls & Memory Hooks (Optional, one per line)</label>
                  <textarea
                    rows={2}
                    value={uploadForm.clinicalPearls}
                    onChange={(e) => setUploadForm({ ...uploadForm, clinicalPearls: e.target.value })}
                    placeholder="Alcohol rub does not kill C. diff spores&#10;Always confirm 2 patient identifiers before procedure"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Pipeline Execution Statistics */}
                {uploadStats && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Ingestion Pipeline Complete: {uploadStats.chunksIndexed} chunks embedded & indexed!</span>
                    </div>
                    {uploadStats.sections && uploadStats.sections.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                          Parsed Section Titles:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {uploadStats.sections.map((sec, sIdx) => (
                            <span key={sIdx} className="px-2 py-0.5 rounded-lg bg-emerald-100/80 text-[10px] font-bold text-emerald-800">
                              {sec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={uploadLoading || !uploadForm.contentBody.trim()}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-400/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{uploadLoading ? 'Chunking & Embedding...' : 'Upload, Chunk & Index'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
