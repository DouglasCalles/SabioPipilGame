import { useEffect, useState } from "react";

export default function Timer({ 
  initialSeconds = 15, 
  onTimeUp = () => {}, 
  onTimeChange = () => {},
  isActive = true,
  disabled = false
}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [customTime, setCustomTime] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
    setCustomTime(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isActive || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const handleCustomTimeChange = (e) => {
    const newTime = Math.max(1, Math.min(120, parseInt(e.target.value) || 1));
    setCustomTime(newTime);
    setSeconds(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-[#5C3A21]">{seconds}s</div>
    </div>
  );
}
