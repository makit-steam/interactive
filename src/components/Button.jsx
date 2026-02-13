import { Link } from "react-router-dom";

const variants = {
  primary: "bg-primary hover:bg-primary-dark text-white",
  secondary: "bg-yellow hover:bg-yellow-dark text-gray-900",
  turquoise: "bg-turquoise hover:bg-turquoise-dark text-white",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
};

export default function Button({ children, variant = "primary", to, onClick, className = "", ...props }) {
  const base = `inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center cursor-pointer ${variants[variant]} ${className}`;

  if (to) {
    return <Link to={to} className={base} {...props}>{children}</Link>;
  }
  return <button className={base} onClick={onClick} {...props}>{children}</button>;
}
