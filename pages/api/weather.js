// Next.js API route for weather data
// This will be protected with Clerk authentication later

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: Get weather data for a city
 *     description: Returns mock weather data including temperature, conditions, and forecast. Requires bearer token authentication.
 *     tags:
 *       - Weather
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           default: San Francisco
 *         description: City name to get weather for
 *         example: Boston
 *     responses:
 *       200:
 *         description: Successful response with weather data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   example: San Francisco
 *                 country:
 *                   type: string
 *                   example: USA
 *                 temperature:
 *                   type: object
 *                   properties:
 *                     current:
 *                       type: number
 *                       example: 65
 *                     feelsLike:
 *                       type: number
 *                       example: 63
 *                     unit:
 *                       type: string
 *                       example: fahrenheit
 *                 condition:
 *                   type: string
 *                   example: Partly Cloudy
 *                 humidity:
 *                   type: number
 *                   example: 72
 *                 windSpeed:
 *                   type: number
 *                   example: 8
 *                 pressure:
 *                   type: number
 *                   example: 1013
 *                 visibility:
 *                   type: number
 *                   example: 10
 *                 uvIndex:
 *                   type: number
 *                   example: 3
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-11-29T10:30:00Z
 *                 forecast:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: Today
 *                       high:
 *                         type: number
 *                         example: 68
 *                       low:
 *                         type: number
 *                         example: 58
 *                       condition:
 *                         type: string
 *                         example: Partly Cloudy
 *       401:
 *         description: Unauthorized - Missing or invalid bearer token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       405:
 *         description: Method not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Method not allowed
 */
export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  // Bearer token authentication
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing Authorization header'
    });
  }

  // Extract the token (format: "Bearer TOKEN_HERE")
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid Authorization header format. Expected: Bearer <token>'
    });
  }

  const token = parts[1];

  // For testing: accept a hardcoded token
  // In production, this would validate against a database
  const validToken = process.env.TEST_API_KEY || 'sk_test_12345';

  if (token !== validToken) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API key'
    });
  }

  // Token is valid, continue to endpoint
  // Get city from query parameter, default to San Francisco
  const city = req.query.city || 'San Francisco';

  // Return mock weather data
  const weatherData = {
    city: city,
    country: 'USA',
    temperature: {
      current: 65,
      feelsLike: 63,
      unit: 'fahrenheit'
    },
    condition: 'Partly Cloudy',
    humidity: 72,
    windSpeed: 8,
    pressure: 1013,
    visibility: 10,
    uvIndex: 3,
    timestamp: new Date().toISOString(),
    forecast: [
      { day: 'Today', high: 68, low: 58, condition: 'Partly Cloudy' },
      { day: 'Tomorrow', high: 70, low: 60, condition: 'Sunny' },
      { day: 'Sunday', high: 67, low: 57, condition: 'Cloudy' }
    ]
  };

  res.status(200).json(weatherData);
}
