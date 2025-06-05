import rateLimit from 'express-rate-limit';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      rateLimit: {
        limit: number;
        current: number;
        remaining: number;
        resetTime: Date;
      };
    }
  }
}

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Number of milliseconds for the rate limit window (15 minutes)
  max: 100, // Maximum number of requests allowed within the window
  message: { // Custom message to return when the rate limit is exceeded
    error: 'Your request has been rate limited',
    message: 'You have exceeded the rate limit for this endpoint.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => { // Custom handler for when the rate limit is exceeded
    // Attach rate limit information to the request object
    res.status(429).json({ // Return a 429 Too Many Requests status code
      error: 'Rate limit exceeded',
      message: 'You have exceeded the rate limit for this endpoint.',
      retryAfter: Math.ceil(req.rateLimit.resetTime.getTime() / 1000) // Calculate the retry time in seconds
    });
  }
});

export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    error: 'Your request has been rate limited',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

export const websocketLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    error: 'WebSocket rate limit exceeded',
    message: 'You have exceeded the WebSocket rate limit for this endpoint.',
  }
});

export const createLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: 'Your request has been rate limited',
    message: 'You have exceeded the rate limit for creating resources.',
  }
});