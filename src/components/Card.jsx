import { Link } from "react-router-dom";

export default function Card({ title, description, icon, to, color = "bg-primary" }) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <div className={`${color} h-2 group-hover:h-3 transition-all duration-300`} />
      <div className="p-6">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 font-[family-name:var(--font-poppins)]">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
