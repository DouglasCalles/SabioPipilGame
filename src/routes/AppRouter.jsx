import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Game from "../pages/Game";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Results from "../pages/Results";
import Start from "../pages/Start";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/iniciar" element={<Start />} />
          <Route path="/juego" element={<Game />} />
          <Route path="/resultados" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
