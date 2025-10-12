import { Vercel } from '@vercel/sdk';

const bearerToken = process.env.VERCEL_BEARER_TOKEN;

if (!bearerToken) {
  // In a real-world scenario, you might want to handle this error more gracefully.
  // For example, by logging it and disabling Vercel-related features.
  throw new Error('VERCEL_BEARER_TOKEN is not set in the environment variables.');
}

export const vercel = new Vercel({
  bearerToken,
});
