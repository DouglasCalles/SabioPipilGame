import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const showHomeAction = ["/iniciar", "/juego", "/resultados"].includes(location.pathname);
  const backgroundClass =
    location.pathname === "/"
      ? "has-screen-bg home-bg-view"
      : location.pathname === "/iniciar"
      ? "has-screen-bg bkground-view is-start"
      : location.pathname === "/juego"
        ? "has-screen-bg bkground-view is-game"
        : location.pathname === "/resultados"
          ? "has-screen-bg bkground-view is-start"
          : "paper-texture";

  return (
    <main className={`game-shell min-h-screen text-[#2C2218] ${backgroundClass}`}>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mb-4 flex items-center justify-between rounded-xl border border-[#5C3A21]/10 bg-white/55 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-[#3A7D44] text-sm font-black text-white shadow-sm">
              SP
            </span>
            <span className="font-display text-xl text-[#5C3A21]">Sabio Pipil</span>
          </div>
          {showHomeAction ? (
            <button
              className="animate-press rounded-full bg-[#E9B44C]/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#5C3A21] ring-1 ring-[#E9B44C]/30 transition hover:bg-[#E9B44C]/30 focus:outline-none focus:ring-4 focus:ring-[#E9B44C]/30"
              onClick={() => navigate("/")}
              type="button"
            >
              Inicio
            </button>
          ) : (
            <span className="rounded-full bg-[#E9B44C]/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#5C3A21]">
            </span>
          )}
        </nav>
        <Outlet />
      </div>
    </main>
  );
}
