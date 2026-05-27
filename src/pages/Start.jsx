import { useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import useGame from "../hooks/useGame";
import { categories, getQuestionsByCategory } from "../services/triviaService";
import { playSoundEffect } from "../utils/soundEffects";

function hexToRgba(hex, alpha) {
  const cleanHex = hex.replace("#", "");
  const red = parseInt(cleanHex.slice(0, 2), 16);
  const green = parseInt(cleanHex.slice(2, 4), 16);
  const blue = parseInt(cleanHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function Start() {
  const navigate = useNavigate();
  const { gameState, dispatch } = useGame();
  const finishedCategories = Object.keys(gameState.attemptedCategories).length;
  const { score, scoring } = gameState;

  function handleStartGame(categoryId) {
    if (gameState.attemptedCategories[categoryId]) {
      return;
    }

    playSoundEffect("click");
    dispatch({
      type: "START_GAME",
      payload: {
        category: categoryId,
        questions: getQuestionsByCategory(categoryId),
      },
    });
    navigate("/juego");
  }

  return (
    <section className="relative -mx-4 flex flex-1 flex-col justify-center overflow-hidden bg-cover bg-center px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="relative z-10 mb-2 text-center">
        <Badge tone="jade">Elige una categoria</Badge>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#5C3A21]/75">
          Cada categoria es un intento diario. Escoge con calma y avanza como quien sigue un mapa.
        </p>
      </div>

      <div className="relative z-10 grid gap-4 lg:grid-cols-[0.9fr_1.4fr]">
        <Card>
          <div className="grid gap-3">
            <div className="rounded-xl bg-[#F2E8CF] p-4 ring-1 ring-[#5C3A21]/10">
              <p className="text-xs text-center font-bold uppercase tracking-wide text-[#5C3A21]/70">Puntaje global</p>
              <p className="mt-1 text-4xl text-center font-black text-[#3A7D44]">{score} pts</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/75 p-4 ring-1 ring-[#5C3A21]/10">
                <p className="text-xs text-center font-bold uppercase tracking-wide text-[#5C3A21]/70">Correctas</p>
                <p className="mt-1 text-3xl text-center font-black text-[#2A4D69]">{scoring.correctAnswers}</p>
              </div>
              <div className="rounded-xl bg-white/75 p-4 ring-1 ring-[#5C3A21]/10">
                <p className="text-xs text-center font-bold uppercase tracking-wide text-[#5C3A21]/70">Bonos</p>
                <p className="mt-1 text-3xl text-center  font-black text-[#B85042]">+{scoring.bonusPoints}</p>
              </div>
            </div>
            <div className="rounded-xl bg-white/75 p-4 ring-1 ring-[#5C3A21]/10">
              <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wide text-[#5C3A21]/70">
                <span>Progreso diario</span>
                <span>{finishedCategories}/4</span>
              </div>
              <ProgressBar value={finishedCategories} max={4} />
            </div>
          </div>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <button
              className="animate-press group min-h-36 rounded-xl border p-4 text-left shadow-[0_7px_0_rgba(92,58,33,0.18),0_18px_34px_rgba(92,58,33,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_9px_0_rgba(92,58,33,0.2),0_22px_38px_rgba(92,58,33,0.1)] disabled:cursor-not-allowed disabled:opacity-55"
              disabled={Boolean(gameState.attemptedCategories[category.id])}
              key={category.id}
              onClick={() => handleStartGame(category.id)}
              style={{
                backgroundColor: hexToRgba(category.accent, 0.18),
                borderColor: hexToRgba(category.accent, 0.34),
              }}
              type="button"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-[#5C3A21]/55">7 preguntas</span>
                  <span className="mt-1 block text-xl font-black text-[#2C2218]">{category.name}</span>
                  <span className="mt-1 block text-sm leading-5 text-[#5C3A21]/70">{category.description}</span>
                  <span className="mt-3 block text-sm font-bold text-[#3A7D44]">
                    {gameState.categoryResults[category.id] === "completed"
                      ? "Eres todo un sabio papil"
                      : gameState.categoryResults[category.id] === "failed"
                        ? "Ahora no fuiste un sabio pipil"
                        : gameState.attemptedCategories[category.id]
                          ? "Intento usado hoy"
                    : "Comenzar ruta"}
                  </span>
                </span>
                <span className="grid size-14 shrink-0 place-items-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: category.accent }}>
                  {category.icon}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
