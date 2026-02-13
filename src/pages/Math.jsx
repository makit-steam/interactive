import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function MathPage() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-4);

  const discriminant = useMemo(() => b * b - 4 * a * c, [a, b, c]);

  const roots = useMemo(() => {
    if (a === 0) return null;
    if (discriminant < 0) return { type: "none" };
    if (discriminant === 0) {
      return { type: "one", x1: -b / (2 * a) };
    }
    return {
      type: "two",
      x1: (-b + Math.sqrt(discriminant)) / (2 * a),
      x2: (-b - Math.sqrt(discriminant)) / (2 * a),
    };
  }, [a, b, c, discriminant]);

  const vertex = useMemo(() => {
    if (a === 0) return null;
    const vx = -b / (2 * a);
    const vy = a * vx * vx + b * vx + c;
    return { x: vx, y: vy };
  }, [a, b, c]);

  // SVG graph dimensions
  const W = 400, H = 300;
  const xMin = -10, xMax = 10;
  const yMin = -15, yMax = 15;

  function toSvgX(x) { return ((x - xMin) / (xMax - xMin)) * W; }
  function toSvgY(y) { return H - ((y - yMin) / (yMax - yMin)) * H; }

  const pathPoints = useMemo(() => {
    const pts = [];
    for (let px = xMin; px <= xMax; px += 0.2) {
      const py = a * px * px + b * px + c;
      if (py >= yMin && py <= yMax) {
        pts.push(`${toSvgX(px).toFixed(1)},${toSvgY(py).toFixed(1)}`);
      }
    }
    return pts.length > 1 ? `M${pts.join("L")}` : "";
  }, [a, b, c]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link to="/experiments" className="text-primary hover:underline mb-6 inline-block">&larr; Volver a Experimentos</Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Fórmula Cuadrática</h1>
      <p className="text-gray-600 mb-6">Ajusta los coeficientes y observa cómo cambia la parábola.</p>
      <div className="bg-white rounded-xl shadow p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 350 }}>
          {/* Grid lines */}
          {Array.from({ length: 21 }, (_, i) => i + xMin).map((x) => (
            <line key={`vl${x}`} x1={toSvgX(x)} y1={0} x2={toSvgX(x)} y2={H}
              stroke={x === 0 ? "#333" : "#e5e7eb"} strokeWidth={x === 0 ? 1.5 : 0.5} />
          ))}
          {Array.from({ length: 31 }, (_, i) => i + yMin).map((y) => (
            <line key={`hl${y}`} x1={0} y1={toSvgY(y)} x2={W} y2={toSvgY(y)}
              stroke={y === 0 ? "#333" : "#e5e7eb"} strokeWidth={y === 0 ? 1.5 : 0.5} />
          ))}
          {/* Axis labels */}
          <text x={W - 10} y={toSvgY(0) - 5} fontSize="12" fill="#666">x</text>
          <text x={toSvgX(0) + 5} y={12} fontSize="12" fill="#666">y</text>

          {/* Parabola */}
          {a !== 0 && pathPoints && (
            <path d={pathPoints} fill="none" stroke="#0052CC" strokeWidth="2.5" />
          )}

          {/* Vertex */}
          {vertex && a !== 0 && (
            <circle cx={toSvgX(vertex.x)} cy={toSvgY(vertex.y)} r="5" fill="#FFAB00" stroke="#e69a00" strokeWidth="1.5" />
          )}

          {/* Roots */}
          {roots?.type === "two" && (
            <>
              <circle cx={toSvgX(roots.x1)} cy={toSvgY(0)} r="5" fill="#00A3BF" />
              <circle cx={toSvgX(roots.x2)} cy={toSvgY(0)} r="5" fill="#00A3BF" />
            </>
          )}
          {roots?.type === "one" && (
            <circle cx={toSvgX(roots.x1)} cy={toSvgY(0)} r="5" fill="#00A3BF" />
          )}
        </svg>
        <div className="flex gap-4 mt-2 text-xs text-gray-500 justify-center">
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-primary" /> Parábola</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-yellow" /> Vértice</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-turquoise" /> Raíces</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-1 mt-2">
        {/* Graph */}

        {/* Controls */}
        <div className="bg-white rounded-xl shadow p-6 min-h-80">
          <h2 className="font-bold text-gray-700 mb-4">Coeficientes</h2>
          <p className="text-center text-lg font-semibold text-gray-800 mb-4">
            f(x) = {a !== 0 && <><span className="text-primary">{a}</span>x²</>}{" "}
            {b !== 0 && <>{b > 0 && a !== 0 ? "+" : ""}<span className="text-primary">{b}</span>x</>}{" "}
            {c !== 0 && <>{c > 0 && (a !== 0 || b !== 0) ? "+" : ""}<span className="text-primary">{c}</span></>}
            {a === 0 && b === 0 && c === 0 && "0"}
          </p>

          {[
            { label: "a", value: a, set: setA, min: -5, max: 5, step: 0.5 },
            { label: "b", value: b, set: setB, min: -10, max: 10, step: 1 },
            { label: "c", value: c, set: setC, min: -10, max: 10, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          ))}
        </div>

        {/* Formula + Results */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-gray-700 mb-3">Resultados</h2>

          {a === 0 ? (
            <p className="text-gray-500 text-sm">Establece a ≠ 0 para ver una parábola.</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Discriminante:</span>{" "}
                b² - 4ac = {discriminant.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Vértice:</span>{" "}
                ({vertex.x.toFixed(2)}, {vertex.y.toFixed(2)})
              </p>
              {roots.type === "two" && (
                <p>
                  <span className="font-semibold">Raíces:</span>{" "}
                  x₁ = {roots.x1.toFixed(2)}, x₂ = {roots.x2.toFixed(2)}
                </p>
              )}
              {roots.type === "one" && (
                <p>
                  <span className="font-semibold">Raíz (doble):</span>{" "}
                  x = {roots.x1.toFixed(2)}
                </p>
              )}
              {roots.type === "none" && (
                <p className="text-orange-600 font-medium">No tiene raíces reales (Δ &lt; 0)</p>
              )}

              {/* Step by step */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">Fórmula cuadrática:</p>
                <div className="bg-gray-50 rounded-lg p-3 text-center font-mono text-base">
                  x = (-b ± √(b²-4ac)) / 2a
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mt-2 text-center text-sm">
                  x = ({(-b).toFixed(1)} ± √{discriminant.toFixed(1)}) / {(2 * a).toFixed(1)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
