interface exerciseData {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (hours: number[], targetDailyHours: number) => {
  const average = hours.reduce((p, c) => p + c, 0) / hours.length
  let rating: number, ratingDescription: string

  if (average >= targetDailyHours) {
    rating = 3
    ratingDescription = 'Nicely done! Keep up the good work!'
  } else if (average >= (targetDailyHours / 2)) {
    rating = 2
    ratingDescription = 'Not too bad, but you can do better'
  } else  {
    rating = 1
    ratingDescription = 'You could better your performance a lot'
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(i => i > 0).length,
    target: targetDailyHours,
    average,
    success: average >= targetDailyHours,
    rating,
    ratingDescription,
  }
}

console.log(calculateExercises([0, 0, 2, 0, 0, 3, 1], 2))