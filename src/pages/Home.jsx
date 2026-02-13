import HeroSection from "../components/HeroSection";
import Button from "../components/Button";

export default function Home() {
  return (
    <>
      <HeroSection
        title="Aprende haciendo con Makit STEAM"
        subtitle="Experimentos interactivos de Ciencia, Tecnología, Arte y Matemáticas para estudiantes de secundaria."
        ctaText="Explorar Experimentos"
        ctaTo="/experiments"
      />

      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Qué es Makit?</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Makit es una plataforma educativa que transforma el aprendizaje STEAM en una experiencia
              práctica e interactiva. En lugar de solo leer sobre ciencia o matemáticas, puedes
              experimentar directamente desde tu navegador.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Cada experimento está diseñado para que descubras conceptos clave mientras te diviertes.
              Desde programar un robot hasta tocar una melodía en el piano, el aprendizaje nunca fue
              tan emocionante.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🔬", label: "Ciencia", color: "bg-blue-50 text-primary" },
              { icon: "🤖", label: "Tecnología", color: "bg-green-50 text-green-700" },
              { icon: "🎨", label: "Arte", color: "bg-purple-50 text-purple-700" },
              { icon: "📐", label: "Matemáticas", color: "bg-orange-50 text-orange-700" },
            ].map((item) => (
              <div key={item.label} className={`${item.color} rounded-xl p-6 text-center`}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
          Inspirar a la próxima generación de innovadores haciendo que la educación STEAM sea
          accesible, divertida y significativa para todos los estudiantes.
        </p>
        <Button variant="secondary" to="/experiments">Comenzar Ahora</Button>
      </section>
    </>
  );
}
