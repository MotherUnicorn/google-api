import fetch from 'node-fetch';

export async function handler(event) {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const address = event.queryStringParameters.address;

  if (!address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Address is required' })
    };
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch geocode data' })
    };
  }
}
