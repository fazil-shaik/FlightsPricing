import express from 'express';
import cors from 'cors';
import { searchFlights } from './routes/flights.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/flights', searchFlights);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});