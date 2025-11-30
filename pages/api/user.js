// User info endpoint for Mintlify personalization
// This endpoint reads the session cookie and returns the user's API key
// Mintlify will call this to get the API key to prefill in the playground

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  // Parse cookies from the request
  const cookies = req.headers.cookie?.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {}) || {};

  const sessionCookie = cookies.session;

  // Check if session cookie exists
  if (!sessionCookie) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No active session. Please log in.'
    });
  }

  // Validate session cookie (for testing, we accept "test-session-123")
  const validSession = process.env.TEST_SESSION || 'test-session-123';

  if (sessionCookie !== validSession) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid session. Please log in again.'
    });
  }

  // Session is valid, return user data in the format Mintlify expects
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
