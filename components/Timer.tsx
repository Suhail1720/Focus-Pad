import React, { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './icons.tsx';

interface TimerProps {
  onStart: (currentSeconds: number) => void;
  onEnd: (currentSeconds: number) => void;
}

const Timer: React.FC<TimerProps> = ({ onStart, onEnd }) => {
  const [initialSeconds, setInitialSeconds] = useState<number>(300);
  const [seconds, setSeconds] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const [inputHours, setInputHours] = useState('00');
  const [inputMinutes, setInputMinutes] = useState('05');
  const [inputSeconds, setInputSeconds] = useState('00');
  
  const intervalRef = useRef<number | null>(null);

  const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, max: number) => {
    const numValue = parseInt(value, 10);
    if (value === '' || (!isNaN(numValue) && numValue >= 0 && numValue <= max)) {
       setter(value);
    }
  };
  
  const handleTimeBlur = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
      setter(value.padStart(2, '0').slice(-2));
  }

  useEffect(() => {
    const h = parseInt(inputHours, 10) || 0;
    const m = parseInt(inputMinutes, 10) || 0;
    const s = parseInt(inputSeconds, 10) || 0;
    const totalSeconds = h * 3600 + m * 60 + s;
    setInitialSeconds(totalSeconds);
    setSeconds(totalSeconds);
    if(isRunning) {
        onEnd(seconds); // End previous session if time is changed while running
    }
    setIsRunning(false);
  }, [inputHours, inputMinutes, inputSeconds]);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      onEnd(0);
      setIsRunning(false);
      alert("Time's up!");
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds, onEnd]);

  const handleStartPause = () => {
    if (initialSeconds > 0 || seconds > 0) {
      if (!isRunning) {
        onStart(seconds);
      } else {
        onEnd(seconds);
      }
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    if (isRunning) {
      onEnd(seconds);
    }
    setIsRunning(false);
    setSeconds(initialSeconds);
  };
  
  const formatTime = (timeInSeconds: number) => {
    const h = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (timeInSeconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTime(seconds);
  const isTimeUp = initialSeconds > 0 && seconds === 0;

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg ring-1 ring-white/10 p-4 flex flex-col justify-between lg:w-56 lg:flex-shrink-0">
      <div>
        <h2 className="text-xl font-bold text-cyan-300 mb-2">Focus Timer</h2>
        <div className={`text-center my-2 font-mono text-4xl tracking-wider ${isTimeUp ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          <span>{h}</span><span className="text-slate-500">:</span><span>{m}</span><span className="text-slate-500">:</span><span>{s}</span>
        </div>
        
        <div className="flex justify-center items-center gap-1 my-4">
          <input 
            type="text" 
            value={inputHours} 
            onChange={(e) => handleTimeChange(setInputHours, e.target.value, 99)}
            onBlur={(e) => handleTimeBlur(setInputHours, e.target.value)}
            className="w-12 text-center bg-slate-900/70 border border-slate-700 rounded-md p-1 text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
            disabled={isRunning}
            maxLength={2}
          />
          <span className="text-lg font-bold text-slate-500">:</span>
          <input 
            type="text" 
            value={inputMinutes}
            onChange={(e) => handleTimeChange(setInputMinutes, e.target.value, 59)}
            onBlur={(e) => handleTimeBlur(setInputMinutes, e.target.value)}
            className="w-12 text-center bg-slate-900/70 border border-slate-700 rounded-md p-1 text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
            disabled={isRunning}
            maxLength={2}
          />
          <span className="text-lg font-bold text-slate-500">:</span>
          <input 
            type="text" 
            value={inputSeconds}
            onChange={(e) => handleTimeChange(setInputSeconds, e.target.value, 59)}
            onBlur={(e) => handleTimeBlur(setInputSeconds, e.target.value)}
            className="w-12 text-center bg-slate-900/70 border border-slate-700 rounded-md p-1 text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
            disabled={isRunning}
            maxLength={2}
          />
        </div>
        <p className="text-center text-xs text-slate-500 mb-4">HH:MM:SS</p>
      </div>

      <div className="flex justify-center items-center gap-2 mt-auto">
        <button
          onClick={handleStartPause}
          disabled={initialSeconds === 0 && seconds === 0}
          className="w-20 h-9 flex items-center justify-center gap-1 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-400"
        >
          {isRunning ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          <span className="text-sm">{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={handleReset}
          className="w-20 h-9 flex items-center justify-center gap-1 bg-slate-600 hover:bg-slate-500 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500"
        >
          <ResetIcon className="w-4 h-4" />
          <span className="text-sm">Reset</span>
        </button>
      </div>
    </div>
  );
};

export default Timer;
