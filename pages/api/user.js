// User info endpoint for Mintlify personalization
// Temporarily simplified for testing - no auth required
// This just returns hardcoded API key to test if Mintlify prefilling works

export default function handler(req, res) {
  // Set CORS headers to allow requests from docs.deansliney.com
  res.setHeader('Access-Control-Allow-Origin', 'https://docs.deansliney.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  // Return user data in the format Mintlify expects
  // This is what Mintlify will use to prefill the API playground
  res.status(200).json({
    apiPlaygroundInputs: {
      header: {
        Authorization: 'Bearer sk_test_12345'
      }
    },
    content: {
      email: 'test@example.com',
      name: 'Test User'
    }
  });
}
