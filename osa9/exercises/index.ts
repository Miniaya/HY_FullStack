import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

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
      res.json({
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
  
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});