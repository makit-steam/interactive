import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const REASON_OPTIONS = [
  "Más experimentos y contenido para mis hijos",
  "Guías paso a paso más detalladas",
  "Materiales descargables e imprimibles",
  "Apoyo educativo complementario a la escuela",
  "Actividades para hacer en familia",
];

const NOT_INTERESTED_OPTIONS = [
  "El precio es muy alto",
  "No tengo tiempo para usarlo",
  "Mi hijo(a) no mostró suficiente interés",
  "Prefiero contenido gratuito",
  "No es lo que estaba buscando",
];

export default function PricingSurvey({ onClose }) {
  const { saveSurveyResponse } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState("interest"); // "interest" | "reason" | "recommend" | "notInterested"
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [selectedNotInterestedReason, setSelectedNotInterestedReason] = useState(null);
  const [customNotInterestedReason, setCustomNotInterestedReason] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(null);

  async function handleResponse(wouldPay, reason, recommend) {
    setSubmitting(true);
    try {
      await saveSurveyResponse(wouldPay, reason, recommend);
    } finally {
      setSubmitting(false);
      onClose();
    }
  }

  function handleReasonSubmit() {
    const reason = selectedReason === "other" ? customReason.trim() : selectedReason;
    if (!reason) return;
    setStep("recommend");
  }

  function handleRecommendSubmit() {
    if (wouldRecommend === null) return;
    const reason = selectedReason === "other" ? customReason.trim() : selectedReason;
    handleResponse(true, reason, wouldRecommend);
  }

  function handleNotInterestedSubmit() {
    const reason = selectedNotInterestedReason === "other" ? customNotInterestedReason.trim() : selectedNotInterestedReason;
    if (!reason) return;
    handleResponse(false, reason);
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

        {step === "interest" && (
          <>
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
                onClick={() => setStep("reason")}
                disabled={submitting}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              >
                Sí, me interesa
              </button>
              <button
                onClick={() => setStep("notInterested")}
                disabled={submitting}
                className="flex-1 border-2 border-gray-300 text-gray-600 hover:border-gray-400 font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              >
                No por ahora
              </button>
            </div>
          </>
        )}

        {step === "reason" && (
          <>
            <div className="text-4xl mb-4">🤔</div>

            <h2 className="text-xl font-bold text-primary mb-2 font-[family-name:var(--font-poppins)]">
              ¿Cuál sería la razón principal?
            </h2>

            <p className="text-gray-600 mb-5 text-sm">
              ¿Por qué adquirirías la suscripción a la plataforma?
            </p>

            <div className="flex flex-col gap-2 mb-5 text-left">
              {REASON_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors duration-150 ${
                    selectedReason === option
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={option}
                    checked={selectedReason === option}
                    onChange={() => setSelectedReason(option)}
                    className="accent-primary w-4 h-4 shrink-0"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors duration-150 ${
                  selectedReason === "other"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value="other"
                  checked={selectedReason === "other"}
                  onChange={() => setSelectedReason("other")}
                  className="accent-primary w-4 h-4 shrink-0"
                />
                <span className="text-sm text-gray-700">Otra razón</span>
              </label>
              {selectedReason === "other" && (
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Escribe tu razón..."
                  className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:border-primary focus:outline-none mt-1"
                  autoFocus
                />
              )}
            </div>

            <button
              onClick={handleReasonSubmit}
              disabled={submitting || !selectedReason || (selectedReason === "other" && !customReason.trim())}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Enviando..." : "Enviar respuesta"}
            </button>
          </>
        )}

        {step === "recommend" && (
          <>
            <div className="text-4xl mb-4">🙌</div>

            <h2 className="text-xl font-bold text-primary mb-2 font-[family-name:var(--font-poppins)]">
              ¡Última pregunta!
            </h2>

            <p className="text-gray-600 mb-5 text-sm">
              ¿Recomendarías esta plataforma a otro papá o mamá?
            </p>

            <div className="flex gap-3 mb-5">
              <button
                onClick={() => setWouldRecommend(true)}
                className={`flex-1 py-3 rounded-lg font-semibold border-2 transition-colors duration-150 cursor-pointer ${
                  wouldRecommend === true
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Sí, lo recomendaría
              </button>
              <button
                onClick={() => setWouldRecommend(false)}
                className={`flex-1 py-3 rounded-lg font-semibold border-2 transition-colors duration-150 cursor-pointer ${
                  wouldRecommend === false
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                No por ahora
              </button>
            </div>

            <button
              onClick={handleRecommendSubmit}
              disabled={submitting || wouldRecommend === null}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Enviando..." : "Enviar respuesta"}
            </button>
          </>
        )}

        {step === "notInterested" && (
          <>
            <div className="text-4xl mb-4">💬</div>

            <h2 className="text-xl font-bold text-primary mb-2 font-[family-name:var(--font-poppins)]">
              ¡Gracias por tu honestidad!
            </h2>

            <p className="text-gray-600 mb-5 text-sm">
              ¿Podrías decirnos por qué no te interesa? Tu respuesta nos ayuda a mejorar.
            </p>

            <div className="flex flex-col gap-2 mb-5 text-left">
              {NOT_INTERESTED_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors duration-150 ${
                    selectedNotInterestedReason === option
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="notInterestedReason"
                    value={option}
                    checked={selectedNotInterestedReason === option}
                    onChange={() => setSelectedNotInterestedReason(option)}
                    className="accent-primary w-4 h-4 shrink-0"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
              <label
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors duration-150 ${
                  selectedNotInterestedReason === "other"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="notInterestedReason"
                  value="other"
                  checked={selectedNotInterestedReason === "other"}
                  onChange={() => setSelectedNotInterestedReason("other")}
                  className="accent-primary w-4 h-4 shrink-0"
                />
                <span className="text-sm text-gray-700">Otra razón</span>
              </label>
              {selectedNotInterestedReason === "other" && (
                <input
                  type="text"
                  value={customNotInterestedReason}
                  onChange={(e) => setCustomNotInterestedReason(e.target.value)}
                  placeholder="Escribe tu razón..."
                  className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:border-primary focus:outline-none mt-1"
                  autoFocus
                />
              )}
            </div>

            <button
              onClick={handleNotInterestedSubmit}
              disabled={submitting || !selectedNotInterestedReason || (selectedNotInterestedReason === "other" && !customNotInterestedReason.trim())}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Enviando..." : "Enviar respuesta"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
