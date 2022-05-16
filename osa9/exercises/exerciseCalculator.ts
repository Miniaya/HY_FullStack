interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface ParsedArguments {
  targetValue: number;
  trainingPeriod: number[];
}

const parseArgs = (args: string[]): ParsedArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    return {
      targetValue: Number(args[2]),
      trainingPeriod: args.slice(3).map(i => Number(i))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
*/

export const calculateExercises = (hours: number[], targetDailyHours: number): ExerciseData => {
  const average = hours.reduce((p, c) => p + c, 0) / hours.length;
  let rating: number, ratingDescription: string;

  if (average >= targetDailyHours) {
    rating = 3;
    ratingDescription = 'Nicely done! Keep up the good work!';
  } else if (average >= (targetDailyHours / 2)) {
    rating = 2;
    ratingDescription = 'Not too bad, but you can do better';
  } else  {
    rating = 1;
    ratingDescription = 'You could better your performance a lot';
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(i => i > 0).length,
    target: targetDailyHours,
    average,
    success: average >= targetDailyHours,
    rating,
    ratingDescription,
  };
};

try {
  const { targetValue, trainingPeriod } = parseArgs(process.argv);
  calculateExercises(trainingPeriod, targetValue);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}