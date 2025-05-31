import fetch from 'node-fetch';

export async function handler(event) {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const input = event.queryStringParameters.input;

  if (!input) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Input is required' })
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_API_KEY}&components=country:NG`;

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
      body: JSON.stringify({ error: 'Failed to fetch autocomplete data' })
    };
  }
}
