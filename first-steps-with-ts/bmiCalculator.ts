interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers');
  }

  return {
    height,
    weight,
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 16) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
}