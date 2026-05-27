import { useEffect, useMemo, useReducer } from "react";
import { GameContext } from "./GameContext";
import { gameReducer, initialGameState } from "./gameReducer";
import { loadDailyGameState, saveDailyGameState } from "../utils/dailyGameStorage";

export function GameProvider({ children }) {
  const [gameState, dispatch] = useReducer(
    gameReducer,
    initialGameState,
    loadDailyGameState,
  );

  useEffect(() => {
    saveDailyGameState(gameState);
  }, [gameState]);

  const value = useMemo(
    () => ({ gameState, dispatch }),
    [gameState],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
