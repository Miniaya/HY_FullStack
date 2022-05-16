import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  try {
    if (Number(weight) && Number(height)) {
      res.json({
        weight: Number(weight),
        height: Number(height),
        bmi: calculateBmi(Number(height), Number(weight))
      });
    } else {
      res.status(400).json({
        error: 'malformatted parameters'
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({
        error: error.message
      });
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req, res) => {
  console.log(req.body);
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || !daily_exercises.every((i: any) => typeof i === "number")) {
    res.status(400).json({
      error: "malformatted parameters"
    })
  }

  res.json(calculateExercises(daily_exercises, Number(target)))
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});