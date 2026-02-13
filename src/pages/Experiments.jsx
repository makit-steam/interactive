import HeroSection from "../components/HeroSection";
import Card from "../components/Card";

const experiments = [
  {
    title: "Ciencia",
    description: "Pon a prueba tus conocimientos científicos con tarjetas interactivas de trivia.",
    icon: "🔬",
    to: "/experiments/science",
    color: "bg-primary",
  },
  {
    title: "Tecnología",
    description: "Programa un robot para escapar de un laberinto usando bloques de instrucciones.",
    icon: "🤖",
    to: "/experiments/technology",
    color: "bg-turquoise",
  },
  {
    title: "Arte",
    description: "Toca 'Estrellita' en un piano interactivo y aprende sobre notas musicales.",
    icon: "🎨",
    to: "/experiments/art",
    color: "bg-yellow",
  },
  {
    title: "Matemáticas",
    description: "Explora la fórmula cuadrática con gráficas interactivas y deslizadores.",
    icon: "📐",
    to: "/experiments/math",
    color: "bg-purple-500",
  },
];

export default function Experiments() {
  return (
    <>
      <HeroSection
        title="Experimentos Interactivos"
        subtitle="Elige un área STEAM y comienza a experimentar"
      />
      <section className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiments.map((exp) => (
            <Card key={exp.title} {...exp} />
          ))}
        </div>
      </section>
    </>
  );
}
