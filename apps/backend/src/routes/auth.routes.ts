import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { registerValidation } from '../validators/auth.validator';
import { validate } from '../middlewares/validate';
import { registerLimiter } from '../middlewares/rateLimiter';

const router = Router();

// POST /api/auth/register — rate-limited, validated, then handled
router.post(
  '/register',
  registerLimiter,
  registerValidation,
  validate,
  authController.register
);

// GET /api/auth/waitlist-count — public endpoint
router.get('/waitlist-count', authController.getWaitlistCount);

export default router;
