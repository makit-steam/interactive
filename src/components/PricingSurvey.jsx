import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PricingSurvey({ onClose }) {
  const { saveSurveyResponse } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  async function handleResponse(wouldPay) {
    setSubmitting(true);
    try {
      await saveSurveyResponse(wouldPay);
    } finally {
      setSubmitting(false);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative text-center">
        <button
          onClick={() => handleResponse(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
        >
          &times;
        </button>

        <div className="text-4xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold text-primary mb-2 font-[family-name:var(--font-poppins)]">
          ¡Exploraste todos los experimentos!
        </h2>

        <p className="text-gray-600 mb-6">
          Te gustó lo que viste? Estamos preparando contenido más profundo y
          abundante para cada área STEAM.
        </p>

        <div className="bg-bg rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-500 mb-1">Plan mensual</p>
          <p className="text-4xl font-bold text-primary font-[family-name:var(--font-poppins)]">
            $99<span className="text-lg font-normal text-gray-500"> MXN/mes</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Experimentos ilimitados, guías paso a paso, materiales descargables
          </p>
        </div>

        <p className="text-gray-700 font-semibold mb-4">
          ¿Estarías dispuesto a pagar por este contenido?
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => handleResponse(true)}
            disabled={submitting}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          >
            Sí, me interesa
          </button>
          <button
            onClick={() => handleResponse(false)}
            disabled={submitting}
            className="flex-1 border-2 border-gray-300 text-gray-600 hover:border-gray-400 font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          >
            No por ahora
          </button>
        </div>
      </div>
    </div>
  );
}
