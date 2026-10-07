import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { PlusCircle, Trash2, HelpCircle, CheckCircle2, AlertCircle, Stethoscope } from 'lucide-react';

export const FacultyQuestions = () => {
  const [subjects] = useState([
    { id: 'module-1', name: 'Module 1: Carbohydrate Metabolism' },
    { id: 'module-2', name: 'Module 2: Lipid Metabolism' }
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      moduleId: 'module-1',
      moduleName: 'Carbohydrate Metabolism',
      text: 'Which transporter moves glucose and galactose into enterocytes via secondary active transport with sodium?',
      options: ['GLUT-2', 'SGLT-1', 'GLUT-4', 'GLUT-5'],
      correctAnswer: 1,
      rationale: 'SGLT-1 utilizes the electrochemical sodium gradient created by Na+/K+ ATPase to import glucose and galactose against their concentration gradient.',
      difficulty: 'Medium'
    },
    {
      id: 'q2',
      moduleId: 'module-1',
      moduleName: 'Carbohydrate Metabolism',
      text: 'What is the primary diagnostic threshold for fasting plasma glucose in Diabetes Mellitus?',
      options: ['≥ 100 mg/dL', '≥ 126 mg/dL', '≥ 140 mg/dL', '≥ 200 mg/dL'],
      correctAnswer: 1,
      rationale: 'According to ADA guidelines, fasting plasma glucose ≥ 126 mg/dL on two separate occasions confirms diabetes mellitus.',
      difficulty: 'Easy'
    },
    {
      id: 'q3',
      moduleId: 'module-2',
      moduleName: 'Lipid Metabolism',
      text: 'Which of the following is an example of a Monounsaturated Fatty Acid (MUFA)?',
      options: ['Oleic acid (18:1)', 'Linoleic acid (18:2)', 'Palmitic acid (16:0)', 'Stearic acid (18:0)'],
      correctAnswer: 0,
      rationale: 'Oleic acid contains a single double bond at carbon 9 (cis-9-octadecenoic acid), making it the most abundant MUFA.',
      difficulty: 'Hard'
    }
  ]);

  const [selectedModule, setSelectedModule] = useState('all');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const [questionForm, setQuestionForm] = useState({
    moduleId: 'module-1',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    rationale: '',
    difficulty: 'Medium'
  });

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!questionForm.text.trim() || questionForm.options.some((opt) => !opt.trim())) {
      setFeedback({ type: 'error', text: 'Please fill in question prompt and all 4 choices.' });
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
      moduleId: 'module-1',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      rationale: '',
      difficulty: 'Medium'
    });
    setFeedback({ type: 'success', text: 'Question added to faculty question bank.' });
  };

  const handleDeleteQuestion = (qId) => {
    if (window.confirm('Delete this question item?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== qId));
      setFeedback({ type: 'success', text: 'Question removed.' });
    }
  };

  const filtered = questions.filter((q) => selectedModule === 'all' || q.moduleId === selectedModule);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Stethoscope className="w-7 h-7 text-sky-600" />
              <span>Faculty Question Authoring</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Add and curate assessment items and clinical rationales for students.
            </p>
          </div>

          <button
            onClick={() => setShowQuestionModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-400/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Question Item</span>
          </button>
        </div>

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

        {/* Filter */}
        <div className="bg-white/90 border border-slate-200 rounded-2xl p-4 shadow-sm mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-700">Filter by Subject:</span>
          </div>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 text-xs text-slate-900 font-bold focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="all">All Modules ({questions.length} Items)</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {filtered.map((q, idx) => (
            <div key={q.id} className="bg-white/95 border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {q.moduleName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700">
                    {q.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove Question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-bold text-slate-900 mb-3">{q.text}</p>

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
                        optIdx === q.correctAnswer ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>

              {q.rationale && (
                <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-xs text-sky-900">
                  <span className="font-bold">Rationale: </span>
                  <span>{q.rationale}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal: Add Question */}
        {showQuestionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 my-8">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-sky-600" />
                  <span>Author Question Item</span>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Module</label>
                  <select
                    value={questionForm.moduleId}
                    onChange={(e) => setQuestionForm({ ...questionForm, moduleId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500 cursor-pointer"
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
                    placeholder="Enter question text..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Options (Select Correct Choice)</label>
                  <div className="space-y-2">
                    {questionForm.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={questionForm.correctAnswer === idx}
                          onChange={() => setQuestionForm({ ...questionForm, correctAnswer: idx })}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          title="Correct Answer"
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
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Rationale</label>
                  <textarea
                    rows="2"
                    value={questionForm.rationale}
                    onChange={(e) => setQuestionForm({ ...questionForm, rationale: e.target.value })}
                    placeholder="Provide evidence-based clinical reasoning..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
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
                    Add Question
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

export default FacultyQuestions;
