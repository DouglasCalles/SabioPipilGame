import { scoringConfig } from "../config/scoringConfig";

export function getCorrectAnswersCount(answers) {
  return answers.filter((answer) => answer.isCorrect || answer.answer === answer.correctAnswer).length;
}

export function getBaseScore(answers) {
  return getCorrectAnswersCount(answers) * scoringConfig.pointsPerCorrectAnswer;
}

export function calculateScore(answers, bonusPoints = 0) {
  return getBaseScore(answers) + bonusPoints;
}
