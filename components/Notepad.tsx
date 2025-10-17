import React, { useState, useEffect } from 'react';

const Notepad: React.FC = () => {
  const [note, setNote] = useState<string>('');

  // Load the saved note from localStorage when the component mounts
  useEffect(() => {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('savedNote', note);
    alert('Note saved successfully!');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire notepad? This action cannot be undone.')) {
      setNote('');
      localStorage.removeItem('savedNote');
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg ring-1 ring-white/10 p-6 flex flex-col flex-grow">
      <h2 className="text-2xl font-bold text-cyan-300 mb-4">Notepad</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        spellCheck="false"
        className="flex-grow w-full bg-slate-900/70 border border-slate-700 rounded-lg p-4 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow resize-none"
        style={{ minHeight: '300px' }}
      />
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500"
        >
          Clear All
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-400"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default Notepad;
