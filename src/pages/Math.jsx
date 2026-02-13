import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

const CATENARY_FACTS = [
  "La palabra 'catenaria' viene del latín 'catena', que significa cadena. Es la curva que forma una cadena colgando por su propio peso.",
  "El Arco Gateway en St. Louis, Missouri, tiene la forma de una catenaria invertida y mide 192 metros de altura.",
  "Galileo pensó que la catenaria era una parábola, pero en 1691 Leibniz, Huygens y Johann Bernoulli demostraron que es una curva diferente.",
  "Antoni Gaudí usó catenarias invertidas para diseñar los arcos de la Sagrada Familia en Barcelona.",
  "La ecuación de la catenaria es y = a·cosh(x/a). Es una de las curvas más fuertes para soportar su propio peso.",
  "Los arcos catenarios son óptimos en arquitectura porque distribuyen las fuerzas uniformemente, sin necesidad de refuerzos laterales.",
];

function generateTarget() {
  const a = +(1.5 + Math.random() * 3).toFixed(1);   // 1.5 to 4.5
  const h = +(Math.round((Math.random() * 6 - 3) * 2) / 2).toFixed(1); // -3 to 3
  const k = +(Math.round((Math.random() * 6 + 4) * 2) / 2).toFixed(1); // 4 to 10
  return { a, h, k };
}

export default function MathPage() {
  const [target, setTarget] = useState(() => generateTarget());
  const [a, setA] = useState(2.5);
  const [h, setH] = useState(0);
  const [k, setK] = useState(7);
  const [matched, setMatched] = useState(false);
  const [fact, setFact] = useState("");

  // SVG graph dimensions
  const W = 400, H = 300;
  const xMin = -10, xMax = 10;
  const yMin = -2, yMax = 15;

  function toSvgX(x) { return ((x - xMin) / (xMax - xMin)) * W; }
  function toSvgY(y) { return H - ((y - yMin) / (yMax - yMin)) * H; }

  // Build catenary arch path: y = -a * cosh((x - h) / a) + k
  const buildCatenaryPath = useCallback((ca, ch, ck) => {
    const pts = [];
    for (let px = xMin; px <= xMax; px += 0.15) {
      const py = -ca * Math.cosh((px - ch) / ca) + ck;
      if (py >= yMin && py <= yMax) {
        pts.push(`${toSvgX(px).toFixed(1)},${toSvgY(py).toFixed(1)}`);
      }
    }
    return pts.length > 1 ? `M${pts.join("L")}` : "";
  }, []);

  const targetPath = useMemo(() => buildCatenaryPath(target.a, target.h, target.k), [target, buildCatenaryPath]);
  const userPath = useMemo(() => buildCatenaryPath(a, h, k), [a, h, k, buildCatenaryPath]);

  // Check match with tolerance
  const isMatch = useMemo(() => {
    const da = Math.abs(a - target.a);
    const dh = Math.abs(h - target.h);
    const dk = Math.abs(k - target.k);
    return da <= 0.3 && dh <= 0.5 && dk <= 0.5;
  }, [a, h, k, target]);

  // Trigger success
  useMemo(() => {
    if (isMatch && !matched) {
      setMatched(true);
      setFact(CATENARY_FACTS[Math.floor(Math.random() * CATENARY_FACTS.length)]);
    }
  }, [isMatch]);

  const handleNewChallenge = () => {
    setTarget(generateTarget());
    setA(2.5);
    setH(0);
    setK(7);
    setMatched(false);
    setFact("");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link to="/experiments" className="text-primary hover:underline mb-6 inline-block">&larr; Volver a Experimentos</Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Arco Catenario</h1>
      <p className="text-gray-600 mb-6">Ajusta los controles para igualar el arco catenario objetivo.</p>

      <div className="bg-white rounded-xl shadow p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 380 }}>
          {/* Grid lines */}
          {Array.from({ length: 21 }, (_, i) => i + xMin).map((x) => (
            <line key={`vl${x}`} x1={toSvgX(x)} y1={0} x2={toSvgX(x)} y2={H}
              stroke={x === 0 ? "#333" : "#e5e7eb"} strokeWidth={x === 0 ? 1.5 : 0.5} />
          ))}
          {Array.from({ length: 18 }, (_, i) => i + yMin).map((y) => (
            <line key={`hl${y}`} x1={0} y1={toSvgY(y)} x2={W} y2={toSvgY(y)}
              stroke={y === 0 ? "#333" : "#e5e7eb"} strokeWidth={y === 0 ? 1.5 : 0.5} />
          ))}
          <text x={W - 10} y={toSvgY(0) - 5} fontSize="12" fill="#666">x</text>
          <text x={toSvgX(0) + 5} y={12} fontSize="12" fill="#666">y</text>

          {/* Target catenary (low opacity) */}
          {targetPath && (
            <path d={targetPath} fill="none" stroke="#FFAB00" strokeWidth="4" opacity="0.3"
              strokeDasharray={matched ? "none" : "8 4"} />
          )}

          {/* User catenary */}
          {userPath && (
            <path d={userPath} fill="none"
              stroke={matched ? "#22c55e" : "#0052CC"}
              strokeWidth="2.5" />
          )}
        </svg>
        <div className="flex gap-4 mt-2 text-xs text-gray-500 justify-center">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-0.5 bg-yellow opacity-50" style={{ width: 20, height: 3, borderRadius: 2 }} /> Objetivo
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block bg-primary" style={{ width: 20, height: 3, borderRadius: 2 }} /> Tu arco
          </span>
        </div>
      </div>

      {/* Success message */}
      {matched && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-5 text-center animate-pulse">
          <p className="text-green-700 font-bold text-lg mb-2">Excelente! Arco igualado!</p>
          <p className="text-green-600 text-sm">{fact}</p>
          <button
            onClick={handleNewChallenge}
            className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Nuevo desafío
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-1 mt-2">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-gray-700 mb-4">Controles</h2>
          <p className="text-center text-base font-semibold text-gray-800 mb-4 font-mono">
            y = -<span className="text-primary">{a}</span>·cosh((x {h >= 0 ? "-" : "+"} <span className="text-primary">{Math.abs(h)}</span>) / <span className="text-primary">{a}</span>) + <span className="text-primary">{k}</span>
          </p>

          {[
            { label: "a (apertura)", value: a, set: setA, min: 1, max: 5, step: 0.1 },
            { label: "h (desplazamiento horizontal)", value: h, set: setH, min: -5, max: 5, step: 0.5 },
            { label: "k (altura)", value: k, set: setK, min: 2, max: 13, step: 0.5 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => { if (!matched) set(Number(e.target.value)); }}
                className="w-full accent-primary"
                disabled={matched}
              />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-gray-700 mb-3">Qué es una catenaria?</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              Una <span className="font-semibold text-gray-800">catenaria</span> es la curva que forma una cadena o cable flexible
              suspendida de sus extremos por la gravedad.
            </p>
            <p>
              Invertida, se convierte en un <span className="font-semibold text-gray-800">arco catenario</span>, la forma
              más eficiente para distribuir peso en una estructura.
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-center font-mono text-base">
              y = a · cosh(x / a)
            </div>
            <p className="text-xs text-gray-400">
              <span className="font-semibold">a</span> controla la apertura, <span className="font-semibold">h</span> desplaza
              horizontalmente, y <span className="font-semibold">k</span> define la altura máxima del arco.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
