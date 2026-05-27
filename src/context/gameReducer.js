import { scoringConfig } from "../config/scoringConfig";
import { getTodayKey } from "../utils/dailyGameStorage";

export const initialGameState = {
  dailyDate: getTodayKey(),
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  gameFinished: false,
  currentCategory: null,
  categoryResults: {},
  attemptedCategories: {},
  scoring: {
    correctAnswers: 0,
    currentStreak: 0,
    bonusPoints: 0,
    awardedGlobalBonuses: [],
    breakdown: [],
  },
};

function getUpdatedCategoryResults(state, status) {
  if (!state.currentCategory) {
    return state.categoryResults;
  }

  return {
    ...state.categoryResults,
    [state.currentCategory]: status,
  };
}

function areAllCategoriesFinished(categoryResults) {
  return Object.keys(categoryResults).length >= 4;
}

function getCategoryCorrectAnswers(answers, category) {
  return answers.filter((answer) => answer.category === category && answer.isCorrect).length;
}

function getScoringAfterAnswer(state, answerResult, isLastQuestion) {
  if (!answerResult.isCorrect) {
    return {
      ...state.scoring,
      currentStreak: 0,
    };
  }

  const correctAnswers = state.scoring.correctAnswers + 1;
  const currentStreak = state.scoring.currentStreak + 1;
  const categoryCorrectAnswers = getCategoryCorrectAnswers(state.answers, state.currentCategory) + 1;
  let bonusPoints = state.scoring.bonusPoints;
  let awardedGlobalBonuses = state.scoring.awardedGlobalBonuses;
  const breakdown = [
    ...state.scoring.breakdown,
    {
      type: "correct-answer",
      label: "Pregunta correcta",
      points: scoringConfig.pointsPerCorrectAnswer,
    },
  ];

  if (currentStreak % scoringConfig.streakBonus.everyCorrectAnswers === 0) {
    bonusPoints += scoringConfig.streakBonus.points;
    breakdown.push({
      type: "streak-bonus",
      label: `${scoringConfig.streakBonus.everyCorrectAnswers} respuestas seguidas`,
      points: scoringConfig.streakBonus.points,
    });
  }

  if (
    isLastQuestion &&
    categoryCorrectAnswers === scoringConfig.perfectCategoryBonus.correctAnswersRequired
  ) {
    bonusPoints += scoringConfig.perfectCategoryBonus.points;
    breakdown.push({
      type: "perfect-category-bonus",
      label: "Categoria perfecta",
      points: scoringConfig.perfectCategoryBonus.points,
    });
  }

  for (const bonus of scoringConfig.globalCorrectAnswerBonuses) {
    if (
      correctAnswers >= bonus.correctAnswersRequired &&
      !awardedGlobalBonuses.includes(bonus.correctAnswersRequired)
    ) {
      bonusPoints += bonus.points;
      awardedGlobalBonuses = [...awardedGlobalBonuses, bonus.correctAnswersRequired];
      breakdown.push({
        type: "global-bonus",
        label: `${bonus.correctAnswersRequired} respuestas correctas`,
        points: bonus.points,
      });
    }
  }

  return {
    correctAnswers,
    currentStreak,
    bonusPoints,
    awardedGlobalBonuses,
    breakdown,
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case "START_GAME":
      if (state.attemptedCategories[action.payload.category]) {
        return state;
      }

      return {
        ...state,
        questions: action.payload.questions,
        currentCategory: action.payload.category,
        currentQuestionIndex: 0,
        answers: state.answers,
        gameFinished: false,
        attemptedCategories: {
          ...state.attemptedCategories,
          [action.payload.category]: state.dailyDate,
        },
      };

    case "ANSWER_QUESTION": {
      const isCorrect = action.payload.answer === action.payload.correctAnswer;
      const isLastQuestion = state.currentQuestionIndex >= state.questions.length - 1;
      const shouldCloseCategory = !isCorrect || isLastQuestion;
      const categoryResults = shouldCloseCategory
        ? getUpdatedCategoryResults(state, isCorrect ? "completed" : "failed")
        : state.categoryResults;
      const answerResult = {
        ...action.payload,
        category: state.currentCategory,
        isCorrect,
      };
      const scoring = getScoringAfterAnswer(state, answerResult, isLastQuestion);

      return {
        ...state,
        score: scoring.correctAnswers * scoringConfig.pointsPerCorrectAnswer + scoring.bonusPoints,
        answers: [...state.answers, answerResult],
        categoryResults,
        scoring,
        gameFinished: shouldCloseCategory && areAllCategoriesFinished(categoryResults),
      };
    }

    case "NEXT_QUESTION": {
      const lastAnswer = state.answers[state.answers.length - 1];
      const isLastQuestion = state.currentQuestionIndex >= state.questions.length - 1;

      if (!lastAnswer?.isCorrect || isLastQuestion) {
        return state;
      }

      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }

    case "FINISH_GAME":
      return {
        ...state,
        categoryResults: getUpdatedCategoryResults(state, "completed"),
        gameFinished: true,
      };

    case "RESET_GAME":
      return {
        ...initialGameState,
        dailyDate: getTodayKey(),
      };

    default:
      return state;
  }
}
