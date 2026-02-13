export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-6 text-center">
      <p className="font-semibold text-white text-lg mb-1">Makit STEAM</p>
      <p className="text-sm">Aprendizaje interactivo para el futuro</p>
      <p className="text-xs mt-4 text-gray-500">&copy; {new Date().getFullYear()} Makit STEAM. Todos los derechos reservados.</p>
    </footer>
  );
}
