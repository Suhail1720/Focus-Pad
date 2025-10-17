import React from 'react';

interface Session {
  id: number;
  duration: number;
  wordsTyped: number;
  wpm: number;
}

interface HistoryProps {
  sessions: Session[];
}

const History: React.FC<HistoryProps> = ({ sessions }) => {
  const formatDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg ring-1 ring-white/10 p-4 lg:w-56 lg:flex-shrink-0">
      <h2 className="text-xl font-bold text-cyan-300 mb-3">Session History</h2>
      {sessions.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-4">
          Complete a timer session to see your stats here.
        </p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((session) => (
            <li key={session.id} className="text-sm bg-slate-900/50 p-2 rounded-md border border-slate-700">
              <div className="flex justify-between items-center font-semibold">
                <span>{formatDuration(session.duration)}</span>
                <span className="text-cyan-400">{session.wpm} WPM</span>
              </div>
              <p className="text-slate-400 text-xs mt-1">{session.wordsTyped} words typed</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
