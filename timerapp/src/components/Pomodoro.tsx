import React, { useState, useEffect, useRef } from "react";

const Pomodoro = () => {
  // Ref for audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const WORK_TIME = 60 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pomodoro-timeLeft');
      if (stored) return Number(stored);
    }
    return WORK_TIME;
  });
  const [isRunning, setIsRunning] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pomodoro-isRunning');
      if (stored) return stored === 'true';
    }
    return false;
  });
  const [isWorkSession, setIsWorkSession] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pomodoro-isWorkSession');
      if (stored) return stored === 'true';
    }
    return true;
  }); 

  const [totalStudyTime, setTotalStudyTime] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pomodoro-totalStudyTime');
      if (stored) return Number(stored);
    }
    return 0;
  });

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Editable timer state
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  // Handle click to edit
  const handleTimerClick = () => {
    setEditValue(formatTime(timeLeft));
    setEditing(true);
  };

  // Handle input change
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Handle submit or blur
  const handleEditSubmit = () => {
    // Accept mm:ss or m:ss
    const match = editValue.match(/^(\d{1,2}):(\d{2})$/);
    if (match) {
      const min = parseInt(match[1], 10);
      const sec = parseInt(match[2], 10);
      if (!isNaN(min) && !isNaN(sec) && sec < 60) {
        setTimeLeft(min * 60 + sec);
      }
    }
    setEditing(false);
  };

  // Start / Pause timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setTimeLeft(WORK_TIME);
  };

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          // DEV: Show text notification for session complete
          if (isWorkSession) {
            alert('Pomodoro complete! Break time!');
          } else {
            alert('Break complete! Back to work!');
          }
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          if (isWorkSession) {
            // Increment session count in localStorage
            const count = Number(localStorage.getItem('pomodoro-session-count') || '0') + 1;
            localStorage.setItem('pomodoro-session-count', String(count));
            setIsWorkSession(false);
            return BREAK_TIME;
          } else {
            setIsWorkSession(true);
            return WORK_TIME;
          }
        }
        return prev - 1;
      });

      if (isWorkSession) {
        setTotalStudyTime((prev) => prev + 1);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isWorkSession]);

  // Persist state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pomodoro-totalStudyTime', String(totalStudyTime));
      localStorage.setItem('pomodoro-timeLeft', String(timeLeft));
      localStorage.setItem('pomodoro-isRunning', String(isRunning));
      localStorage.setItem('pomodoro-isWorkSession', String(isWorkSession));
    }
  }, [timeLeft, isRunning, isWorkSession]);

  // Progress for circular ring
  const totalTime = isWorkSession ? WORK_TIME : BREAK_TIME;
  const progress = (timeLeft / totalTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111111] text-white font-sans">
      <div className="w-full max-w-xl bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-[#3c3c3c]">
        <h1 className="text-4xl mb-6 font-bold">Pomodoro Timer</h1>
        {/* Circular progress ring */}
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="90"
              stroke="#3c3c3c"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="90"
              stroke="#4d4d4d"
              strokeWidth="10"
              fill="none"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={(2 * Math.PI * 90 * (100 - progress)) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-3xl font-bold">
            {editing ? (
              <input
                type="text"
                className="text-3xl font-bold text-center bg-[#222] border border-pink-500 rounded px-2 py-1 w-28 focus:outline-none"
                value={editValue}
                autoFocus
                onChange={handleEditChange}
                onBlur={handleEditSubmit}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleEditSubmit();
                  if (e.key === 'Escape') setEditing(false);
                }}
                maxLength={5}
                pattern="\d{1,2}:\d{2}"
                inputMode="numeric"
              />
            ) : (
              <span onClick={handleTimerClick} className="cursor-pointer hover:text-pink-400 transition">
                {formatTime(timeLeft)}
              </span>
            )}
            <span className="text-sm mt-2">
              {isWorkSession ? "Work" : "Break"}
            </span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={toggleTimer}
            className="px-6 py-2 bg-[#4d4d4d] text-white font-semibold rounded hover:bg-[#3c3c3c] transition border border-[#3c3c3c]"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-[#4d4d4d] text-white font-semibold rounded hover:bg-[#3c3c3c] transition border border-[#3c3c3c]"
          >
            Reset
          </button>
        </div>
  {/* Audio for session complete */}
  <audio ref={audioRef} src="/beep.wav" preload="auto" />
      </div>
    </div>
  );
};

export default Pomodoro;
