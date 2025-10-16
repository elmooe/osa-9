import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { exerciseValues, calculateExercises} from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightAsNumber = Number(height);
  const weightAsNumber = Number(weight);

  if (isNaN(heightAsNumber) || isNaN(weightAsNumber)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(heightAsNumber, weightAsNumber);

  return res.json({
    height: heightAsNumber,
    weight: weightAsNumber,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const dailyExercises = daily_exercises.map((e: unknown) => Number(e));
  if (dailyExercises.some(isNaN)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result: exerciseValues = calculateExercises(dailyExercises, Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});