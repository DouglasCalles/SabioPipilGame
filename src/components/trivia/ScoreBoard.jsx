export default function ScoreBoard({ className = "", score = 0 }) {
  return (
    <div
      className={`mx-auto flex flex-col items-center rounded-2xl bg-[#5C3A21] px-5 py-3 shadow-[0_10px_22px_rgba(92,58,33,0.18)] ring-1 ring-[#E9B44C]/25 ${className}`.trim()}
    >
      <span className="text-[0.68rem] font-bold uppercase tracking-wide text-[#E9B44C]">
        Puntaje
      </span>

      <strong className="text-lg font-black leading-none text-white">
        {score} pts
      </strong>
    </div>
  );
}