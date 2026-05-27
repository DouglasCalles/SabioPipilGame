import gastronomiaQuestions from "../data/gastronomia.json";
import historiaQuestions from "../data/historia.json";
import lugaresQuestions from "../data/lugares.json";
import tradicionesQuestions from "../data/tradiciones.json";
import { shuffleArray } from "../utils/shuffleArray";

export const categories = [
  { id: "gastronomia", name: "Gastronomia", icon: "MA", accent: "#fdad00", description: "Sabores, maiz y cocina cotidiana." },
  { id: "lugares", name: "Lugares", icon: "VO", accent: "#3A7D44", description: "Paisajes, volcanes y memoria territorial." },
  { id: "historia", name: "Historia", icon: "PI", accent: "#2A4D69", description: "Hechos, personajes y raices culturales." },
  { id: "tradiciones-culturas", name: "Tradiciones y culturas", icon: "NA", accent: "#B85042", description: "Fiestas, simbolos y herencia viva." },
];

const questionsByCategory = {
  gastronomia: gastronomiaQuestions,
  lugares: lugaresQuestions,
  historia: historiaQuestions,
  "tradiciones-culturas": tradicionesQuestions,
};

export function getQuestionsByCategory(categoryId, limit = 7) {
  return shuffleArray(questionsByCategory[categoryId] ?? []).slice(0, limit);
}
