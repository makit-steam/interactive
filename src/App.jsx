import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Experiments from "./pages/Experiments";
import Science from "./pages/Science";
import Technology from "./pages/Technology";
import Art from "./pages/Art";
import MathPage from "./pages/Math";

export default function App() {
  return (
    <BrowserRouter basename="/interactive/">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/experiments/science" element={<Science />} />
          <Route path="/experiments/technology" element={<Technology />} />
          <Route path="/experiments/art" element={<Art />} />
          <Route path="/experiments/math" element={<MathPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
