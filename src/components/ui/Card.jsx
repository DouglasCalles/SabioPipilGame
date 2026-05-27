export default function Card({ children, className = "" }) {
  return (
    <section className={`rounded-xl border border-[#5C3A21]/10 bg-[#FFFAF0]/92 p-5 shadow-[0_18px_45px_rgba(92,58,33,0.10)] backdrop-blur-sm sm:p-7 ${className}`.trim()}>
      {children}
    </section>
  );
}
