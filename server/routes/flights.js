import express from 'express';
import { generateFlightPrices } from '../services/flightService.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    const { source, destination, date } = req.body;
    
    if (!source || !destination || !date) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const prices = await generateFlightPrices(source, destination, date);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;