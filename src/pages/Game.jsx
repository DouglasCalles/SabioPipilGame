import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnswerButton from "../components/trivia/AnswerButton";
import PointsPanel from "../components/trivia/PointsPanel";
import QuestionCard from "../components/trivia/QuestionCard";
import ScoreBoard from "../components/trivia/ScoreBoard";
import Timer from "../components/trivia/Timer";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import useGame from "../hooks/useGame";
import { categories } from "../services/triviaService";
import { playSoundEffect } from "../utils/soundEffects";

export default function Game() {
  const navigate = useNavigate();
  const { gameState, dispatch } = useGame();
  const { questions, currentCategory, currentQuestionIndex, score, scoring, gameFinished } = gameState;
  const currentQuestion = questions[currentQuestionIndex];
  const categoryName = categories.find((category) => category.id === currentCategory)?.name;
  const [answerSelection, setAnswerSelection] = useState({ answer: null, questionIndex: -1 });
  const [timerKey, setTimerKey] = useState(0);
  const [timeLimit, setTimeLimit] = useState(15);
  const selectedAnswer =
    answerSelection.questionIndex === currentQuestionIndex ? answerSelection.answer : null;
  const hasAnswered = selectedAnswer !== null;
  const selectedIsCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  useEffect(() => {
    if (gameFinished) {
      navigate("/resultados");
    }
  }, [gameFinished, navigate]);

  useEffect(() => {
    setTimerKey((prev) => prev + 1);
    setAnswerSelection({ answer: null, questionIndex: -1 });
  }, [currentQuestionIndex]);

  if (!currentQuestion) {
    return (
      <section className="flex flex-1 items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">No hay partida activa</h1>
          <button
            className="mt-6 text-emerald-700 underline"
            onClick={() => {
              playSoundEffect("click");
              navigate("/iniciar");
            }}
            type="button"
          >
            Elegir categoria
          </button>
        </div>
      </section>
    );
  }

  function handleAnswer(answer) {
    if (hasAnswered) {
      return;
    }

    playSoundEffect(answer === currentQuestion.correctAnswer ? "correct" : "incorrect");
    setAnswerSelection({ answer, questionIndex: currentQuestionIndex });

    dispatch({
      type: "ANSWER_QUESTION",
      payload: {
        questionId: currentQuestion.id,
        answer,
        correctAnswer: currentQuestion.correctAnswer,
      },
    });
  }

  function handleContinue() {
    if (!selectedIsCorrect || currentQuestionIndex >= questions.length - 1) {
      const nextPath = Object.keys(gameState.categoryResults).length >= 3 ? "/resultados" : "/iniciar";
      navigate(nextPath);
      return;
    }

    dispatch({ type: "NEXT_QUESTION" });
  }

  function handleTimeUp() {
    if (!hasAnswered) {
      const incorrectAnswer = currentQuestion.options.find(
        (option) => option !== currentQuestion.correctAnswer
      );
      handleAnswer(incorrectAnswer || currentQuestion.options[0]);
    }
  }

  function getAnswerClassName(option) {
    if (!hasAnswered) {
      return "bg-white !text-black ring-1 ring-[#5C3A21]/12 shadow-sm hover:bg-[#F2E8CF]";
    }

    if (option === currentQuestion.correctAnswer) {
      return "bg-[#3A7D44] !text-black hover:bg-[#3A7D44]";
    }

    if (option === selectedAnswer) {
      return "bg-[#B85042] !text-black hover:bg-[#B85042]";
    }

    return "bg-[#F2E8CF] !text-black hover:bg-[#F2E8CF]";
  }

  return (
    <section className="relative -mx-4 flex flex-1 flex-col justify-center gap-3 overflow-hidden bg-cover bg-center px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="relative z-10 grid grid-cols-3 items-stretch gap-2">
        <ScoreBoard className="h-full w-full justify-center rounded-xl px-3" score={score} />
        <PointsPanel className="contents" scoring={scoring} showScore={false} />
      </div>
      <div className="relative z-10">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Badge tone="anil">{categoryName}</Badge>
            <Timer 
              key={timerKey}
              initialSeconds={timeLimit}
              onTimeUp={handleTimeUp}
              onTimeChange={setTimeLimit}
              isActive={!hasAnswered}
              disabled={hasAnswered}
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-[#5C3A21]/60 text-center">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        <ProgressBar value={currentQuestionIndex + 1} max={questions.length} />
      </div>
      <div className="relative z-10">
        <QuestionCard question={currentQuestion.question}>
        {hasAnswered && (
          <div className="mt-6 rounded-xl bg-[#F2E8CF] p-4 ring-1 ring-[#5C3A21]/10">
            <p className={`font-bold ${selectedIsCorrect ? "text-[#3A7D44]" : "text-[#B85042] text-c"}`}>
              {selectedIsCorrect ? "Respuesta correcta" : "Respuesta incorrecta"}
            </p>
            {!selectedIsCorrect && (
              <p className="mt-2 text-sm text-[#5C3A21]/75">
                La respuesta correcta es:{" "}
                <span className="font-semibold">{currentQuestion.correctAnswer}</span>
              </p>
            )}
            <Button className="mt-4 w-full sm:w-auto" onClick={handleContinue}>
              Continuar
            </Button>
          </div>
        )}
        <div className="mt-6 grid gap-3">
          {currentQuestion.options.map((option) => (
            <AnswerButton
              answer={option}
              className={getAnswerClassName(option)}
              disabled={hasAnswered}
              key={option}
              onClick={() => handleAnswer(option)}
              playClickSound={false}
            />
          ))}
        </div>
        
        </QuestionCard>
      </div>
    </section>
  );
}
