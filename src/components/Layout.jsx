import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeadForm from "./LeadForm";
import PricingSurvey from "./PricingSurvey";
import { useAuth } from "../context/AuthContext";
import { usePageTracking } from "../hooks/usePageTracking";

const EXPERIMENT_PATHS = [
  "/experiments/science",
  "/experiments/technology",
  "/experiments/art",
  "/experiments/math",
];

export default function Layout() {
  const { isLeadComplete, surveyCompleted, loading } = useAuth();
  const location = useLocation();
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showPricingSurvey, setShowPricingSurvey] = useState(false);
  const visitedExperiments = useRef(new Set());

  usePageTracking();

  useEffect(() => {
    if (!isLeadComplete || surveyCompleted) return;
    const path = location.pathname;
    if (EXPERIMENT_PATHS.includes(path)) {
      visitedExperiments.current.add(path);
    }
    if (visitedExperiments.current.size === EXPERIMENT_PATHS.length) {
      setShowPricingSurvey(true);
    }
  }, [location.pathname, isLeadComplete, surveyCompleted]);

  const isExperimentRoute = location.pathname.startsWith("/experiments");
  const shouldGate = isExperimentRoute && !isLeadComplete && !loading;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {shouldGate && !showLeadForm ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4 font-[family-name:var(--font-poppins)]">
              Acceso a experimentos
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Para acceder a los experimentos interactivos, necesitamos algunos
              datos. Solo te tomará un momento.
            </p>
            <button
              onClick={() => setShowLeadForm(true)}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Registrarme
            </button>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />

      {showLeadForm && (
        <LeadForm onClose={() => setShowLeadForm(false)} />
      )}

      {showPricingSurvey && (
        <PricingSurvey onClose={() => setShowPricingSurvey(false)} />
      )}
    </div>
  );
}
