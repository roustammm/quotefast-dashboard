"use client";

import { useState, useCallback, useEffect } from 'react';
import { useStandby } from '../../contexts/StandbyContext';
import { Lock, Delete } from 'lucide-react';

export default function LockScreen() {
  const { unlockApp } = useStandby();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleKeyPress = useCallback((key: string) => {
    setError('');
    if (pin.length < 4) {
      setPin(prevPin => prevPin + key);
    }
  }, [pin]);

  const handleDelete = useCallback(() => {
    setError('');
    setPin(prevPin => prevPin.slice(0, -1));
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.length !== 4) {
      setError('Voer een 4-cijferige code in.');
      return;
    }
    
    const success = unlockApp(pin);
    if (!success) {
      setError('Incorrecte PIN. Probeer opnieuw.');
      setPin('');
      if (typeof window.navigator.vibrate === 'function') {
        window.navigator.vibrate(200);
      }
    } else {
      setError('');
    }
  }, [pin, unlockApp]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        handleKeyPress(event.key);
      } else if (event.key === 'Backspace') {
        handleDelete();
      } else if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress, handleDelete, handleSubmit]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-xl flex items-center justify-center z-50 text-white font-sans animate-fade-in">
      <div className="w-full max-w-xs text-center">
        <div className="bg-white/10 rounded-full p-4 inline-block mb-6 shadow-lg animate-scale-in">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Sluimerstand Actief</h2>
        <p className="text-gray-400 mb-8">Voer uw PIN in om door te gaan.</p>
        
        <div className="flex justify-center items-center space-x-3 mb-8 h-12">
          {Array(4).fill(0).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 ${
                pin.length > i ? 'bg-blue-500 border-blue-500' : 'border-white/30'
              } transition-all duration-300`}
            />
          ))}
        </div>
        
        {error && <p className="text-red-400 mb-4 h-5 animate-shake">{error}</p>}

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="p-4 rounded-full bg-white/10 text-2xl font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleSubmit}
            className="p-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
          >
            OK
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="p-4 rounded-full bg-white/10 text-2xl font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="p-4 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
