import {
  registerUser,
  loginUser,
  verifyGoogleCredential,
  verifyToken,
  requestPasswordReset,
} from '../server/auth.js';

export default async function handler(req, res) {
  // Extract path from url query or request path
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname.replace(/\/$/, '');
  const action = pathname.split('/').pop();

  // Route: /api/auth/signup
  if (action === 'signup' && req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      const result = registerUser({ name, email, password });
      return res.status(201).json({ success: true, ...result });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  // Route: /api/auth/login
  if (action === 'login' && req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const result = loginUser({ email, password });
      return res.status(200).json({ success: true, ...result });
    } catch (err) {
      return res.status(401).json({ success: false, error: err.message });
    }
  }

  // Route: /api/auth/google
  if (action === 'google' && req.method === 'POST') {
    try {
      const { credential } = req.body;
      const result = verifyGoogleCredential(credential);
      return res.status(200).json({ success: true, ...result });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  // Route: /api/auth/me
  if (action === 'me' && req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Authorization token required.' });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, error: 'Session expired or invalid.' });
    }

    return res.status(200).json({ success: true, user: payload });
  }

  // Route: /api/auth/forgot-password
  if (action === 'forgot-password' && req.method === 'POST') {
    try {
      const { email } = req.body;
      const result = requestPasswordReset(email);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
  }

  return res.status(404).json({ error: 'Auth action not found.' });
}
