export default function Badge({ children, className = "", tone = "jade" }) {
  const tones = {
    jade: "bg-[#3A7D44]/10 text-[#3A7D44] ring-[#3A7D44]/15",
    maiz: "bg-[#E9B44C]/18 text-[#5C3A21] ring-[#E9B44C]/35",
    anil: "bg-[#2A4D69]/10 text-[#2A4D69] ring-[#2A4D69]/15",
    rojo: "bg-[#B85042]/10 text-[#B85042] ring-[#B85042]/15",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1 ${tones[tone]} ${className}`.trim()}>
      {children}
    </span>
  );
}
