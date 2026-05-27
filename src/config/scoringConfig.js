export const scoringConfig = {
  pointsPerCorrectAnswer: 1,
  streakBonus: {
    everyCorrectAnswers: 3,
    points: 1,
  },
  perfectCategoryBonus: {
    correctAnswersRequired: 7,
    points: 3,
  },
  globalCorrectAnswerBonuses: [
    { correctAnswersRequired: 7, points: 2 },
    { correctAnswersRequired: 14, points: 4 },
  ],
};
