import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { mazeGrid, startPos, exitPos, instructions, solutionHint } from "../data/mazeConfig";
import Button from "../components/Button";

const CELL_SIZE = 48;

export default function Technology() {
  const [program, setProgram] = useState([]);
  const [robotPos, setRobotPos] = useState(startPos);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const [error, setError] = useState(null);
  const nextId = useRef(0);

  function handleDragStart(e, instruction) {
    e.dataTransfer.setData("text/plain", JSON.stringify(instruction));
  }

  function handleDrop(e) {
    e.preventDefault();
    if (running) return;
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    setProgram((p) => [...p, { ...data, uid: nextId.current++ }]);
    setError(null);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function removeBlock(uid) {
    if (running) return;
    setProgram((p) => p.filter((b) => b.uid !== uid));
  }

  const runProgram = useCallback(async () => {
    if (program.length === 0) return;
    setRunning(true);
    setError(null);
    let pos = { ...startPos };
    setRobotPos({ ...startPos });

    for (const block of program) {
      await new Promise((r) => setTimeout(r, 400));
      const newPos = {
        row: pos.row + block.delta.row,
        col: pos.col + block.delta.col,
      };

      if (
        newPos.row < 0 || newPos.row >= mazeGrid.length ||
        newPos.col < 0 || newPos.col >= mazeGrid[0].length ||
        mazeGrid[newPos.row][newPos.col] === 1
      ) {
        setError("El robot chocó con una pared. Intenta otra secuencia.");
        setRunning(false);
        return;
      }

      pos = newPos;
      setRobotPos({ ...pos });

      if (pos.row === exitPos.row && pos.col === exitPos.col) {
        setWon(true);
        setRunning(false);
        return;
      }
    }

    if (pos.row !== exitPos.row || pos.col !== exitPos.col) {
      setError("El robot no llegó a la salida. Agrega más instrucciones.");
    }
    setRunning(false);
  }, [program]);

  function reset() {
    setProgram([]);
    setRobotPos(startPos);
    setRunning(false);
    setWon(false);
    setError(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link to="/experiments" className="text-primary hover:underline mb-6 inline-block">&larr; Volver a Experimentos</Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Laberinto del Robot</h1>
      <p className="text-gray-600 mb-6">Arrastra las instrucciones para programar el camino del robot hasta la salida.</p>

      {won && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-6 text-center">
          <p className="text-xl font-bold text-green-700">🎉 ¡El robot llegó a la salida!</p>
          <Button onClick={reset} className="mt-3">Jugar de Nuevo</Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Maze */}
        <div>
          <h2 className="font-bold text-gray-700 mb-3">Laberinto</h2>
          <div
            className="inline-grid gap-0 border-2 border-gray-300 rounded-lg overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${mazeGrid[0].length}, ${CELL_SIZE}px)`,
            }}
          >
            {mazeGrid.map((row, r) =>
              row.map((cell, c) => {
                const isRobot = robotPos.row === r && robotPos.col === c;
                const isExit = r === exitPos.row && c === exitPos.col;
                let bg = cell === 1 ? "bg-gray-800" : "bg-white";
                if (isExit && cell !== 1) bg = "bg-green-100";

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`${bg} flex items-center justify-center border border-gray-200`}
                    style={{ width: CELL_SIZE, height: CELL_SIZE }}
                  >
                    {isRobot && <span className="text-2xl transition-all duration-300">🤖</span>}
                    {isExit && !isRobot && <span className="text-lg">🚪</span>}
                  </div>
                );
              })
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">{solutionHint}</p>
        </div>

        {/* Controls */}
        <div>
          <h2 className="font-bold text-gray-700 mb-3">Instrucciones</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {instructions.map((inst) => (
              <div
                key={inst.id}
                draggable
                onDragStart={(e) => handleDragStart(e, inst)}
                className="bg-turquoise text-white px-4 py-2 rounded-lg cursor-grab active:cursor-grabbing font-semibold select-none"
              >
                {inst.icon} {inst.label}
              </div>
            ))}
          </div>

          <h2 className="font-bold text-gray-700 mb-3">Programa</h2>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="min-h-[120px] bg-white border-2 border-dashed border-gray-300 rounded-xl p-3 flex flex-wrap gap-2 items-start content-start mb-4"
          >
            {program.length === 0 && (
              <p className="text-gray-400 text-sm w-full text-center mt-8">Arrastra instrucciones aquí</p>
            )}
            {program.map((block) => (
              <div
                key={block.uid}
                onClick={() => removeBlock(block.uid)}
                className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-500 transition-colors"
                title="Click para eliminar"
              >
                {block.icon} {block.label}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-3 font-medium">{error}</p>
          )}

          <div className="flex gap-3">
            <Button onClick={runProgram} variant="primary" disabled={running || won || program.length === 0}>
              {running ? "Ejecutando..." : "▶ Inicio"}
            </Button>
            <Button onClick={reset} variant="outline" disabled={running}>Reiniciar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
