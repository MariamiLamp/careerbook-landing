import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for the registration endpoint.
 * Limits each IP to 10 registration attempts per 15-minute window.
 */
export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many registration attempts. Please try again later.',
  },
});
