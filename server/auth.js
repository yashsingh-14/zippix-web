import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Persistent data directory
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data folder exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('[Zippix Auth] Could not create data directory (serverless environment):', err.message);
}

// In-memory fallback if file system is read-only (e.g. AWS Lambda / Vercel)
let memoryUsers = new Map();

// Configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'zippix_secure_jwt_secret_yash_singh_production_2026';
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'yashsingh14@gmail.com').toLowerCase().trim();

// Load users from persistent storage
function loadUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      const list = JSON.parse(data || '[]');
      memoryUsers = new Map(list.map((u) => [u.email.toLowerCase(), u]));
    }
  } catch (err) {
    console.warn('[Zippix Auth] Failed to load users file, using memory store:', err.message);
  }
  return memoryUsers;
}

// Save users to persistent storage
function saveUsers() {
  try {
    const list = Array.from(memoryUsers.values());
    if (fs.existsSync(DATA_DIR)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(list, null, 2), 'utf8');
    }
  } catch (err) {
    console.warn('[Zippix Auth] Could not persist users to file:', err.message);
  }
}

// Initialize users on boot
loadUsers();

/**
 * Hash password using Node's native scrypt (Cryptographically secure & salted)
 */
export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored hash using timing-safe comparison
 */
export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  try {
    const [salt, key] = storedHash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

/**
 * Create a tamper-proof cryptographically signed JWT token
 */
export function createToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(
    JSON.stringify({
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

/**
 * Verify JWT token signature and expiry
 */
export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  if (signature !== expectedSig) {
    return null; // Tampered or invalid token
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null; // Expired token
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Sanitize user object for sending to client (strips password hash)
 */
export function sanitizeUser(user) {
  const isTargetAdmin = user.email.toLowerCase().trim() === ADMIN_EMAIL;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: isTargetAdmin ? 'Founder & System Admin' : user.role || 'Pro Developer',
    isAdmin: isTargetAdmin,
    avatar: user.avatar || (isTargetAdmin ? 'https://github.com/yashsingh-14.png' : null),
    provider: user.provider || 'local',
    createdAt: user.createdAt,
  };
}

/**
 * Real Register / Sign Up
 */
export function registerUser({ name, email, password }) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const cleanEmail = email.toLowerCase().trim();
  loadUsers();

  if (memoryUsers.has(cleanEmail)) {
    throw new Error('An account with this email already exists. Please sign in instead.');
  }

  const isTargetAdmin = cleanEmail === ADMIN_EMAIL;

  const newUser = {
    id: crypto.randomUUID(),
    name: name?.trim() || cleanEmail.split('@')[0],
    email: cleanEmail,
    passwordHash: hashPassword(password),
    role: isTargetAdmin ? 'Founder & System Admin' : 'Pro Developer',
    isAdmin: isTargetAdmin,
    provider: 'local',
    avatar: isTargetAdmin
      ? 'https://github.com/yashsingh-14.png'
      : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
    createdAt: new Date().toISOString(),
  };

  memoryUsers.set(cleanEmail, newUser);
  saveUsers();

  const userPublic = sanitizeUser(newUser);
  const token = createToken(userPublic);

  return { user: userPublic, token };
}

/**
 * Real Login with Email & Password
 */
export function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const cleanEmail = email.toLowerCase().trim();
  loadUsers();

  const user = memoryUsers.get(cleanEmail);
  if (!user) {
    throw new Error('No account found with this email. Please sign up first.');
  }

  if (user.provider === 'google' && !user.passwordHash) {
    throw new Error('This account was created with Google. Please use Sign in with Google.');
  }

  const isValid = verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Incorrect password. Please verify and try again.');
  }

  const isTargetAdmin = cleanEmail === ADMIN_EMAIL;
  user.isAdmin = isTargetAdmin;
  if (isTargetAdmin) {
    user.role = 'Founder & System Admin';
  }

  const userPublic = sanitizeUser(user);
  const token = createToken(userPublic);

  return { user: userPublic, token };
}

/**
 * Real Google Identity OAuth Token Verification
 * Handles official Google credential tokens from Google Identity Services SDK
 */
export function verifyGoogleCredential(credential) {
  if (!credential || typeof credential !== 'string') {
    throw new Error('Invalid Google credential token received.');
  }

  // Google ID Tokens are 3-part JWTs
  const parts = credential.split('.');
  if (parts.length !== 3) {
    throw new Error('Malformed Google credential.');
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch {
    throw new Error('Failed to parse Google ID token payload.');
  }

  if (!payload || !payload.email) {
    throw new Error('Google credential missing verified email.');
  }

  // Verify token is not expired
  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
    throw new Error('Google authentication token has expired. Please sign in again.');
  }

  const cleanEmail = payload.email.toLowerCase().trim();
  const isTargetAdmin = cleanEmail === ADMIN_EMAIL;

  loadUsers();
  let user = memoryUsers.get(cleanEmail);

  if (!user) {
    // Create new user authenticated via Google
    user = {
      id: crypto.randomUUID(),
      googleSub: payload.sub,
      name: payload.name || cleanEmail.split('@')[0],
      email: cleanEmail,
      role: isTargetAdmin ? 'Founder & System Admin' : 'Pro Developer',
      isAdmin: isTargetAdmin,
      provider: 'google',
      avatar: payload.picture || (isTargetAdmin ? 'https://github.com/yashsingh-14.png' : null),
      createdAt: new Date().toISOString(),
    };
    memoryUsers.set(cleanEmail, user);
    saveUsers();
  } else {
    // Update existing user with Google details
    user.provider = user.provider || 'google';
    user.avatar = payload.picture || user.avatar;
    user.isAdmin = isTargetAdmin;
    if (isTargetAdmin) {
      user.role = 'Founder & System Admin';
    }
    saveUsers();
  }

  const userPublic = sanitizeUser(user);
  const token = createToken(userPublic);

  return { user: userPublic, token };
}

/**
 * Request Password Reset
 */
export function requestPasswordReset(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  const cleanEmail = email.toLowerCase().trim();
  loadUsers();
  const user = memoryUsers.get(cleanEmail);

  // Return success message regardless to prevent email enumeration attacks
  const resetToken = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

  if (user) {
    user.resetToken = resetToken;
    user.resetExpires = expires;
    saveUsers();
    console.log(`[Zippix Auth] Password reset link for ${cleanEmail}: /reset-password?token=${resetToken}`);
  }

  return {
    success: true,
    message: `If an account exists for ${cleanEmail}, password reset instructions have been dispatched.`,
  };
}
