export function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
