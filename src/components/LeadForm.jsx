import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const GRADOS = [
  "Primaria 1",
  "Primaria 2",
  "Primaria 3",
  "Primaria 4",
  "Primaria 5",
  "Primaria 6",
  "Secundaria 1",
  "Secundaria 2",
  "Secundaria 3",
];

export default function LeadForm({ onClose }) {
  const { saveLead } = useAuth();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    gradoEscolar: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.email.trim()) newErrors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email no válido";
    if (!form.telefono.trim()) newErrors.telefono = "El teléfono es requerido";
    if (!form.gradoEscolar)
      newErrors.gradoEscolar = "Selecciona un grado escolar";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      await saveLead(form);
      onClose?.();
    } catch {
      setErrors({ general: "Error al guardar. Intenta de nuevo." });
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-primary mb-2 font-[family-name:var(--font-poppins)]">
          Antes de continuar...
        </h2>
        <p className="text-gray-600 mb-6">
          Regístrate para acceder a los experimentos interactivos de Makit
          STEAM.
        </p>

        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="10 dígitos"
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Grado escolar del hijo/a
            </label>
            <select
              name="gradoEscolar"
              value={form.gradoEscolar}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
            >
              <option value="">Selecciona un grado</option>
              {GRADOS.map((grado) => (
                <option key={grado} value={grado}>
                  {grado}
                </option>
              ))}
            </select>
            {errors.gradoEscolar && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gradoEscolar}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Guardando..." : "Acceder a experimentos"}
          </button>
        </form>
      </div>
    </div>
  );
}
