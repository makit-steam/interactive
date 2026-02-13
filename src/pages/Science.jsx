import { useState } from "react";
import { Link } from "react-router-dom";
import { scienceQuestions } from "../data/scienceQuestions";
import Button from "../components/Button";

export default function Science() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = scienceQuestions[current];

  function handleSelect(index) {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    if (index === q.answer) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= scienceQuestions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completado</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <p className="text-6xl mb-4">{score >= scienceQuestions.length * 0.7 ? "🎉" : "📚"}</p>
          <p className="text-2xl font-bold text-gray-800 mb-2">
            {score} / {scienceQuestions.length}
          </p>
          <p className="text-gray-600">
            {score >= scienceQuestions.length * 0.7
              ? "¡Excelente trabajo! Tienes un gran conocimiento científico."
              : "¡Buen intento! Sigue aprendiendo y mejorarás."}
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={handleRestart}>Intentar de Nuevo</Button>
          <Button variant="outline" to="/experiments">Volver</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <Link to="/experiments" className="text-primary hover:underline mb-6 inline-block">&larr; Volver a Experimentos</Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Trivia de Ciencia</h1>
        <span className="text-sm bg-primary text-white px-3 py-1 rounded-full">
          {current + 1} / {scienceQuestions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / scienceQuestions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((option, i) => {
            let classes = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium cursor-pointer ";
            if (!revealed) {
              classes += selected === i
                ? "border-primary bg-blue-50"
                : "border-gray-200 hover:border-primary hover:bg-blue-50";
            } else if (i === q.answer) {
              classes += "border-green-500 bg-green-50 text-green-800";
            } else if (i === selected) {
              classes += "border-red-400 bg-red-50 text-red-700";
            } else {
              classes += "border-gray-200 opacity-50";
            }

            return (
              <button key={i} className={classes} onClick={() => handleSelect(i)}>
                {option}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm font-semibold text-primary mb-1">
              {selected === q.answer ? "✓ ¡Correcto!" : "✗ Incorrecto"}
            </p>
            <p className="text-sm text-gray-700">{q.explanation}</p>
          </div>
        )}

        {revealed && (
          <div className="mt-6 text-center">
            <Button onClick={handleNext}>
              {current + 1 >= scienceQuestions.length ? "Ver Resultados" : "Continuar"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
