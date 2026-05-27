import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Home() {
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);

  return (
    <section className="relative -mx-4 flex flex-1 items-end overflow-hidden px-4 pb-8 pt-28 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="relative w-full animate-rise py-8 text-white sm:max-w-3xl">
        <Badge className="bg-[#FFFAF0]/92" tone="maiz">Trivia cultural salvadoreña</Badge>
        <h1 className="font-display mt-5 text-6xl leading-none text-[#FFFAF0] sm:text-7xl">
          Sabio <span className="text-[#E9B44C]">Pipil</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#FFFAF0]/86">
          Aprende jugando sobre gastronomia, lugares, historia, tradiciones y cultura de El Salvador.
        </p>
        <div className="mt-8 grid gap-3 sm:flex">
          <Button className="w-full sm:w-auto" onClick={() => navigate("/iniciar")}>
          Jugar
          </Button>
          <Button className="w-full bg-white/90 sm:w-auto" onClick={() => setShowRules(true)} variant="ghost">
            ¿Como jugar?
          </Button>
        </div>
      </div>
      {showRules && (
        <Modal title="Reglas del juego" onClose={() => setShowRules(false)}>
          <div className="space-y-3">
            <p>
              <strong>Bienvenido a Sabio Pipil</strong>, una trivia cultural sobre El Salvador.
            </p>
            <ul className="list-inside space-y-2">
              <li>• Responde correctamente para ganar puntos.</li>
              <li>• Tienes 15 segundos para responder cada pregunta.</li>
              <li>• Si fallas una pregunta, la categoría se cierra.</li>
              <li>• Explora 4 categorías: Gastronomía, Historia, Lugares, Tradiciones y Cultura.</li>
              <li>• Contesta todas las preguntas correctamente para ganar puntos.</li>
              <li>• Cada respuesta correcta vale 1 punto base.</li>
            </ul>
            <p className="pt-2 text-xs text-[#5C3A21]/65">
              ¿Listo para demostrar cuánto sabes sobre El Salvador? ¡Comencemos!
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
}
