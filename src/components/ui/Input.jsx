export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`min-h-12 w-full rounded-xl border border-[#5C3A21]/12 bg-white/80 px-4 text-[#2C2218] shadow-sm outline-none transition placeholder:text-[#8D8D8D] focus:border-[#3A7D44] focus:ring-4 focus:ring-[#E9B44C]/25 ${className}`.trim()}
      {...props}
    />
  );
}
