import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// app.use(cors({
//   origin: 'http://localhost:5173'  // Or '*' during development
// }));
app.use(cors({ origin: 'https://maalu.org' }));

app.get('/geocode', async (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Geocode fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch geocode data' });
  }
});

app.get('/distance', async (req, res) => {
  const { origins, destinations } = req.query;

  if (!origins || !destinations) {
    return res.status(400).json({ error: 'Both origins and destinations are required' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(destinations)}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Distance Matrix API error:', error);
    res.status(500).json({ error: 'Failed to fetch distance matrix' });
  }
});



app.get('/autocomplete', async (req, res) => {
  const input = req.query.input;
  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_API_KEY}&components=country:NG`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Autocomplete fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch autocomplete data' });
  }
});

app.get('/place-details', async (req, res) => {
  const placeId = req.query.place_id;

  if (!placeId) {
    return res.status(400).json({ error: 'place_id is required' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Place Details API error:', error);
    res.status(500).json({ error: 'Failed to fetch place details' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
