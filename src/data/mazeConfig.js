// 0 = path, 1 = wall, 2 = start, 3 = exit
export const mazeGrid = [
  [1, 1, 1, 1, 1, 1, 1],
  [2, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 3],
  [1, 1, 1, 1, 1, 1, 1],
];

export const startPos = { row: 1, col: 0 };
export const exitPos = { row: 5, col: 6 };

export const instructions = [
  { id: "right", label: "Derecha", icon: "→", delta: { row: 0, col: 1 } },
  { id: "left", label: "Izquierda", icon: "←", delta: { row: 0, col: -1 } },
  { id: "up", label: "Arriba", icon: "↑", delta: { row: -1, col: 0 } },
  { id: "down", label: "Abajo", icon: "↓", delta: { row: 1, col: 0 } },
];

// One valid solution: Right, Right, Down, Down, Right, Right, Down, Down, Right, Right
export const solutionHint = "Pista: necesitas ~10 movimientos para llegar a la salida.";
