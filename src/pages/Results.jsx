import { useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import useGame from "../hooks/useGame";
import { categories } from "../services/triviaService";

export default function Results() {
  const navigate = useNavigate();
  const { gameState } = useGame();
  const total = gameState.answers.length;
  const bonusEvents = gameState.scoring.breakdown.filter((item) => item.type !== "correct-answer");
  const basePoints = gameState.scoring.correctAnswers;

  return (
    <section className="flex flex-1 items-center py-10">
      <Card className="w-full text-center">
        <Badge tone="maiz">Resultados</Badge>
        <h1 className="font-display mt-3 text-5xl text-[#5C3A21]">Tu puntaje</h1>
        <p className="mt-6 text-6xl font-black text-[#3A7D44]">
          {gameState.score} pts
        </p>
        <p className="mt-2 text-sm font-medium text-[#5C3A21]/70">
          {gameState.scoring.correctAnswers}/{total} respuestas correctas
        </p>
        <div className="mt-6 rounded-xl bg-[#F2E8CF] p-4 text-left ring-1 ring-[#5C3A21]/10">
          <p className="font-bold text-[#2C2218]">Resumen de puntuacion</p>
          <div className="mt-3 space-y-2 text-sm text-[#5C3A21]/75">
            <div className="flex justify-between">
              <span>Preguntas correctas</span>
              <strong>{basePoints} pts</strong>
            </div>
            <div className="flex justify-between">
              <span>Bonos</span>
              <strong>{gameState.scoring.bonusPoints} pts</strong>
            </div>
          </div>
          {bonusEvents.length > 0 && (
            <div className="mt-4 border-t border-[#5C3A21]/10 pt-3">
              <p className="text-sm font-bold text-[#2C2218]">Bonos ganados</p>
              <ul className="mt-2 space-y-1 text-sm text-[#5C3A21]/75">
                {bonusEvents.map((bonus, index) => (
                  <li className="flex justify-between" key={`${bonus.type}-${index}`}>
                    <span>{bonus.label}</span>
                    <strong>+{bonus.points}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
  
        <Button className="mt-8 w-full sm:w-auto" onClick={() => navigate("/")}>
          Volver al inicio
        </Button>
      </Card>
    </section>
  );
}
