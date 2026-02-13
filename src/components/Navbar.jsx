import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-primary no-underline">
          Makit <span className="text-yellow">STEAM</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors no-underline font-semibold">Inicio</Link>
          <Link to="/experiments" className="text-gray-700 hover:text-primary transition-colors no-underline font-semibold">Experimentos</Link>
        </div>
      </div>
    </nav>
  );
}
