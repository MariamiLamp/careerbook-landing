import bcrypt from 'bcrypt';
import prisma from '../lib/prisma';

const SALT_ROUNDS = 12;

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
}

/**
 * Registers a new user.
 * - Checks for duplicate email.
 * - Hashes the password with bcrypt (12 salt rounds).
 * - Creates the user in the database.
 * - Returns the user object (without password) and their waitlist position.
 */
export const register = async (data: RegisterData) => {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const error = new Error('A user with this email already exists') as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  // Create the user
  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      gender: data.gender,
    },
  });

  // Return user without password
  const { password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    waitlistPosition: user.waitlistPosition,
  };
};

/**
 * Returns the total number of registered users (waitlist count).
 */
export const getWaitlistCount = async (): Promise<number> => {
  return prisma.user.count();
};
