export interface exerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): {  target: number; dailyExercises: Array<number> } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyExercises = args.slice(3).map(arg => Number(arg));

  if (isNaN(target) || dailyExercises.some(isNaN)) {
    throw new Error('values were not numbers');
  }

  return {
    target,
    dailyExercises
  };
};

export const calculateExercises = (dailyExercises: Array<number>, target: number): exerciseValues => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day > 0).length;
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;
  if (average >= target * 1.25) {
    rating = 3;
    ratingDescription = 'good';
  } else if (average >= target) {
    rating = 2;
    ratingDescription = '3,6; not great not terrible';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  try {
    const { dailyExercises, target } = parseArguments(process.argv);
    const result = calculateExercises(dailyExercises, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}