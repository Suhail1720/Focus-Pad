import React, { useState } from 'react';

const Notepad: React.FC = () => {
  const [note, setNote] = useState<string>('');

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
    </div>
  );
};

export default Notepad;