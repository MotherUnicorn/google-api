import fetch from 'node-fetch';

export async function handler(event) {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const placeId = event.queryStringParameters.place_id;

  if (!placeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'place_id is required' })
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

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
      body: JSON.stringify({ error: 'Failed to fetch place details' })
    };
  }
}
