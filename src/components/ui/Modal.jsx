import Button from "./Button";

export default function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#2C2218]/45 px-4 backdrop-blur-sm">
      <section className="w-full max-w-md rounded-xl border border-[#E9B44C]/25 bg-[#FFFAF0] p-5 shadow-[0_24px_70px_rgba(44,34,24,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl text-[#5C3A21]">{title}</h2>
          <Button aria-label="Cerrar modal" className="min-h-9 px-3 py-2" onClick={onClose} variant="ghost">
            X
          </Button>
        </div>
        <div className="mt-4 text-sm leading-6 text-[#5C3A21]/80">{children}</div>
      </section>
    </div>
  );
}
