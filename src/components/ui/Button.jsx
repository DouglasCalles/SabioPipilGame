import { playSoundEffect } from "../../utils/soundEffects";

const variants = {
  primary: "bg-[#3A7D44] text-white shadow-[0_12px_24px_rgba(58,125,68,0.22)] hover:bg-[#316b3a]",
  secondary: "bg-[#E9B44C] text-[#2C2218] shadow-[0_12px_24px_rgba(233,180,76,0.24)] hover:bg-[#dca642]",
  ghost: "bg-white/70 text-[#5C3A21] ring-1 ring-[#5C3A21]/12 hover:bg-white",
  danger: "bg-[#B85042] text-white shadow-[0_12px_24px_rgba(184,80,66,0.2)] hover:bg-[#a8473b]",
};

export default function Button({
  children,
  className = "",
  onClick,
  playClickSound = true,
  variant = "primary",
  ...props
}) {
  function handleClick(event) {
    if (playClickSound && !props.disabled) {
      playSoundEffect("click");
    }

    onClick?.(event);
  }

  return (
    <button
      className={`animate-press inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-[#E9B44C]/30 disabled:cursor-not-allowed disabled:opacity-55 ${variants[variant]} ${className}`.trim()}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
