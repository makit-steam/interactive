import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { noteFrequencies, whiteKeys, blackKeys, estrellitaMelody } from "../data/pianoNotes";
import Button from "../components/Button";

export default function Art() {
  const [currentNote, setCurrentNote] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const audioCtxRef = useRef(null);

  function getAudioCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  const playNote = useCallback((note) => {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = noteFrequencies[note];
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  }, []);

  function handleKeyPress(note) {
    playNote(note);

    if (completed) return;

    const expected = estrellitaMelody[currentNote].note;
    if (note === expected) {
      setFeedback("correct");
      if (currentNote + 1 >= estrellitaMelody.length) {
        setCompleted(true);
      } else {
        setCurrentNote((n) => n + 1);
      }
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => setFeedback(null), 400);
  }

  function handleRestart() {
    setCurrentNote(0);
    setCompleted(false);
    setFeedback(null);
  }

  const expectedNote = completed ? null : estrellitaMelody[currentNote]?.note;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link to="/experiments" className="text-primary hover:underline mb-6 inline-block">&larr; Volver a Experimentos</Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Piano: Estrellita</h1>
      <p className="text-gray-600 mb-6">Toca las notas correctas para completar la melodía de "Estrellita".</p>

      {completed && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-6 text-center">
          <p className="text-xl font-bold text-green-700">🎵 ¡Felicidades! Tocaste la melodía completa.</p>
          <Button onClick={handleRestart} className="mt-3">Tocar de Nuevo</Button>
        </div>
      )}

      {/* Sheet music */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="font-bold text-gray-700 mb-3">Partitura</h2>
        <div className="flex flex-wrap gap-2">
          {estrellitaMelody.map((item, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${i < currentNote
                ? "bg-green-100 text-green-700"
                : i === currentNote && !completed
                  ? "bg-yellow text-gray-900 scale-110 shadow-md"
                  : completed
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
            >
              {item.label}
            </div>
          ))}
        </div>
        {!completed && (
          <p className="mt-3 text-sm text-gray-600">
            Toca: <span className="font-bold text-primary">{estrellitaMelody[currentNote]?.label}</span>
            {" "}({estrellitaMelody[currentNote]?.note})
          </p>
        )}
      </div>

      <div className="h-6 mb-4">
        {/* Feedback */}
        {feedback && (
          <div className={`text-center text-lg font-bold ${feedback === "correct" ? "text-green-600" : "text-red-500"}`}>
            {feedback === "correct" ? "✓ ¡Correcto!" : "✗ Intenta otra vez"}
          </div>
        )}
      </div>

      {/* Piano */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <div className="relative" style={{ width: whiteKeys.length * 50, height: 180 }}>
          {/* White keys */}
          {whiteKeys.map((note, i) => (
            <button
              key={note}
              onClick={() => handleKeyPress(note)}
              className={`absolute top-0 border border-gray-300 rounded-b-lg transition-colors duration-100 cursor-pointer ${note === expectedNote
                ? "bg-yellow-100 border-yellow"
                : "bg-white hover:bg-gray-100"
                }`}
              style={{ left: i * 50, width: 48, height: 180 }}
            >
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                {note.replace(/\d/, "")}
              </span>
            </button>
          ))}
          {/* Black keys */}
          {blackKeys.map(({ note, offset }) => (
            <button
              key={note}
              onClick={() => handleKeyPress(note)}
              className={`absolute top-0 z-10 rounded-b-lg transition-colors duration-100 cursor-pointer ${note === expectedNote
                ? "bg-yellow border-yellow"
                : "bg-gray-800 hover:bg-gray-700"
                }`}
              style={{ left: offset * 50 + 32, width: 32, height: 110 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
