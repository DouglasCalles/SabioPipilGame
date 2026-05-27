export default function ProgressBar({ value = 0, max = 100 }) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div
      className="h-3 overflow-hidden rounded-full bg-[#5C3A21]/10 p-0.5"
      aria-valuemin="0"
      aria-valuemax={max}
      aria-valuenow={value}
      role="progressbar"
    >
      <div
        className="h-full rounded-full bg-[#E9B44C] shadow-[0_0_10px_rgba(233,180,76,0.35)] ring-1 ring-[#F3D27A]/30 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
