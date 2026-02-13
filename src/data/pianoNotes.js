// Frequencies for two octaves (C4 to B5)
export const noteFrequencies = {
  C4: 261.63, "C#4": 277.18, D4: 293.66, "D#4": 311.13,
  E4: 329.63, F4: 349.23, "F#4": 369.99, G4: 392.00,
  "G#4": 415.30, A4: 440.00, "A#4": 466.16, B4: 493.88,
  C5: 523.25, "C#5": 554.37, D5: 587.33, "D#5": 622.25,
  E5: 659.25, F5: 698.46, "F#5": 739.99, G5: 783.99,
  "G#5": 830.61, A5: 880.00, "A#5": 932.33, B5: 987.77,
};

export const whiteKeys = [
  "C4", "D4", "E4", "F4", "G4", "A4", "B4",
  "C5", "D5", "E5", "F5", "G5", "A5", "B5",
];

export const blackKeys = [
  { note: "C#4", offset: 0 }, { note: "D#4", offset: 1 },
  { note: "F#4", offset: 3 }, { note: "G#4", offset: 4 }, { note: "A#4", offset: 5 },
  { note: "C#5", offset: 7 }, { note: "D#5", offset: 8 },
  { note: "F#5", offset: 10 }, { note: "G#5", offset: 11 }, { note: "A#5", offset: 12 },
];

// "Twinkle Twinkle Little Star" / "Estrellita" melody
export const estrellitaMelody = [
  { note: "C4", label: "Do" },
  { note: "C4", label: "Do" },
  { note: "G4", label: "Sol" },
  { note: "G4", label: "Sol" },
  { note: "A4", label: "La" },
  { note: "A4", label: "La" },
  { note: "G4", label: "Sol" },
  // pause
  { note: "F4", label: "Fa" },
  { note: "F4", label: "Fa" },
  { note: "E4", label: "Mi" },
  { note: "E4", label: "Mi" },
  { note: "D4", label: "Re" },
  { note: "D4", label: "Re" },
  { note: "C4", label: "Do" },
];
