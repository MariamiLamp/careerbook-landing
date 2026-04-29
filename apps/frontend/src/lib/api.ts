const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      gender: string;
      waitlistPosition: number;
      createdAt: string;
      updatedAt: string;
    };
    waitlistPosition: number;
  };
}

interface WaitlistCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

interface ApiError {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Register a new user on the waitlist.
 */
export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = data as ApiError;
    throw new Error(error.errors?.[0]?.message || error.message || 'Registration failed');
  }

  return data as RegisterResponse;
};

/**
 * Fetch the current waitlist count.
 */
export const fetchWaitlistCount = async (): Promise<number> => {
  const res = await fetch(`${API_BASE_URL}/auth/waitlist-count`);
  const data: WaitlistCountResponse = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch waitlist count');
  }

  return data.data.count;
};
