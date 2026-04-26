import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

/**
 * POST /api/auth/register
 * Registers a new user and returns their waitlist position.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phone, password, gender } = req.body;

    const result = await authService.register({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result,
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    const message = error.statusCode ? error.message : 'An unexpected error occurred';

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

/**
 * GET /api/auth/waitlist-count
 * Returns the total number of registered users.
 */
export const getWaitlistCount = async (_req: Request, res: Response): Promise<void> => {
  try {
    const count = await authService.getWaitlistCount();

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve waitlist count',
    });
  }
};
