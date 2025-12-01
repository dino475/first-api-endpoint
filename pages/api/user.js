// User info endpoint for Mintlify personalization
// Temporarily simplified for testing - no auth required
// This just returns hardcoded API key to test if Mintlify prefilling works

export default function handler(req, res) {
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
