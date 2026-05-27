const STORAGE_KEY = "sabio-pipil-daily-game";
const TIME_ZONE = "America/El_Salvador";

export function getTodayKey() {
  return new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
}

export function loadDailyGameState(initialState) {
  const today = getTodayKey();

  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!savedState || savedState.dailyDate !== today) {
      return { ...initialState, dailyDate: today };
    }

    return {
      ...initialState,
      ...savedState,
      dailyDate: today,
    };
  } catch {
    return { ...initialState, dailyDate: today };
  }
}

export function saveDailyGameState(gameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}
