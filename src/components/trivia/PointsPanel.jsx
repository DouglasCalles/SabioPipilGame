import { scoringConfig } from "../../config/scoringConfig";

function getNextGlobalBonus(correctAnswers, awardedGlobalBonuses) {
  return scoringConfig.globalCorrectAnswerBonuses.find(
    (bonus) =>
      correctAnswers < bonus.correctAnswersRequired &&
      !awardedGlobalBonuses.includes(bonus.correctAnswersRequired),
  );
}

export default function PointsPanel({ className = "", scoring, showScore = true }) {
  const streakTarget = scoringConfig.streakBonus.everyCorrectAnswers;
  const streakProgress = scoring.currentStreak % streakTarget;
  const nextStreakIn = streakProgress === 0 ? streakTarget : streakTarget - streakProgress;
  const nextGlobalBonus = getNextGlobalBonus(scoring.correctAnswers, scoring.awardedGlobalBonuses);

  return (
    <aside className={`${className || `grid gap-2 ${showScore ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"}`}`}>
      {showScore && (
        <div className="rounded-xl bg-[#F2E8CF] p-3 shadow-sm ring-1 ring-[#5C3A21]/10 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-[#5C3A21]/70 text-center">Puntos</p>
          <p className="text-2xl font-black text-[#23646e]">{scoring.totalScore}</p>
        </div>
      )}

        <div className="rounded-xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-[#5C3A21]/10 text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-[#5C3A21]/70 text-center">Racha</p>
          <p className="text-2xl font-black leading-none text-[#5C3A21]">{scoring.currentStreak}</p>
          <p className="mt-1 text-[0.68rem] leading-4 text-[#5C3A21]/70">
          +{scoringConfig.streakBonus.points} en {nextStreakIn} correcta(s)
        </p>
      </div>

      <div className="rounded-xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-[#5C3A21]/10 text-center">
        <p className="text-[0.65rem] font-bold uppercase tracking-wide text-[#5C3A21]/70 text-center">Bono global</p>
        <p className="text-2xl font-black leading-none text-[#B85042]">{scoring.correctAnswers}</p>
        <p className="mt-1 text-[0.68rem] leading-4 text-[#5C3A21]/70">
          {nextGlobalBonus
            ? `Bono +${nextGlobalBonus.points} al llegar a ${nextGlobalBonus.correctAnswersRequired}`
            : "Bonos globales completos"}
        </p>
      </div>
    </aside>
  );
}
