import React, { useState, useEffect } from 'react';
import Timer from './components/Timer.tsx';
import Notepad from './components/Notepad.tsx';
import History from './components/History.tsx';

interface Session {
  id: number;
  duration: number;
  wordsTyped: number;
  wpm: number;
}

interface ActiveSession {
  noteAtStart: string;
  secondsAtStart: number;
  isActive: boolean;
}

const App: React.FC = () => {
  const [note, setNote] = useState<string>('');
  const [history, setHistory] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<ActiveSession>({
    noteAtStart: '',
    secondsAtStart: 0,
    isActive: false,
  });

  // Load saved note and history from localStorage on initial render
  useEffect(() => {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
      setNote(savedNote);
    }
    const savedHistory = localStorage.getItem('sessionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleTimerStart = (currentSeconds: number) => {
    setActiveSession({
      noteAtStart: note,
      secondsAtStart: currentSeconds,
      isActive: true,
    });
  };

  const handleTimerEnd = (currentSeconds: number) => {
    if (!activeSession.isActive) return;

    const wordsAtStart = activeSession.noteAtStart.split(/\s+/).filter(Boolean).length;
    const wordsAtEnd = note.split(/\s+/).filter(Boolean).length;
    const wordsTyped = Math.max(0, wordsAtEnd - wordsAtStart);

    const durationInSeconds = activeSession.secondsAtStart - currentSeconds;

    if (durationInSeconds <= 0) {
      setActiveSession({ noteAtStart: '', secondsAtStart: 0, isActive: false });
      return; // Avoid division by zero or recording empty sessions
    }

    const durationInMinutes = durationInSeconds / 60;
    const wpm = Math.round(wordsTyped / durationInMinutes);

    const newEntry: Session = {
      id: Date.now(),
      duration: durationInSeconds,
      wordsTyped,
      wpm,
    };

    setHistory(prev => {
      const updatedHistory = [newEntry, ...prev].slice(0, 5);
      localStorage.setItem('sessionHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
    
    setActiveSession({ noteAtStart: '', secondsAtStart: 0, isActive: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 tracking-tight">Focus Pad</h1>
        <p className="text-slate-400 mt-2 text-lg">Your personal notepad with a focus timer.</p>
      </header>
      <main className="w-full flex-grow flex flex-col lg:flex-row items-stretch gap-8">
        <div className="flex flex-col gap-8">
            <Timer onStart={handleTimerStart} onEnd={handleTimerEnd} />
            <History sessions={history} />
        </div>
        <Notepad note={note} setNote={setNote} />
      </main>
      <footer className="mt-8 text-center text-slate-500 text-sm">
        <p>Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
