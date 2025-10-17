import React from 'react';
import Timer from './components/Timer.tsx';
import Notepad from './components/Notepad.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">Focus Pad</h1>
        <p className="text-slate-400 mt-2 text-lg">Your personal notepad with a focus timer.</p>
      </header>
      <main className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-stretch gap-8">
        <Timer />
        <Notepad />
      </main>
      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;