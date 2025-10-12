import { z } from 'zod';

// Profile validation schema
export const profileSchema = z.object({
  firstName: z.string()
    .min(2, 'Voornaam moet minimaal 2 karakters bevatten')
    .max(50, 'Voornaam mag maximaal 50 karakters bevatten')
    .regex(/^[a-zA-Z\s\-']+$/, 'Voornaam mag alleen letters, spaties, koppeltekens en apostroffen bevatten'),
  lastName: z.string()
    .min(2, 'Achternaam moet minimaal 2 karakters bevatten')
    .max(50, 'Achternaam mag maximaal 50 karakters bevatten')
    .regex(/^[a-zA-Z\s\-']+$/, 'Achternaam mag alleen letters, spaties, koppeltekens en apostroffen bevatten'),
  email: z.string()
    .email('Ongeldig emailadres')
    .min(1, 'Email is verplicht'),
  phone: z.string()
    .regex(/^(\+31|0)[1-9][0-9]{8}$/, 'Ongeldig Nederlands telefoonnummer (bijv. +31612345678 of 0612345678)')
    .optional()
    .or(z.literal('')),
});

// Security validation schema
export const securitySchema = z.object({
  currentPassword: z.string()
    .min(1, 'Huidig wachtwoord is verplicht'),
  newPassword: z.string()
    .min(8, 'Wachtwoord moet minimaal 8 karakters bevatten')
    .regex(/[A-Z]/, 'Wachtwoord moet minimaal 1 hoofdletter bevatten')
    .regex(/[a-z]/, 'Wachtwoord moet minimaal 1 kleine letter bevatten')
    .regex(/[0-9]/, 'Wachtwoord moet minimaal 1 cijfer bevatten')
    .regex(/[^A-Za-z0-9]/, 'Wachtwoord moet minimaal 1 speciaal karakter bevatten'),
  confirmPassword: z.string()
    .min(1, 'Bevestig wachtwoord is verplicht'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
});

// PIN validation schema
export const pinSchema = z.object({
  newPin: z.string()
    .length(4, 'PIN moet exact 4 cijfers bevatten')
    .regex(/^\d{4}$/, 'PIN mag alleen cijfers bevatten'),
  confirmPin: z.string()
    .length(4, 'PIN moet exact 4 cijfers bevatten')
    .regex(/^\d{4}$/, 'PIN mag alleen cijfers bevatten'),
}).refine((data) => data.newPin === data.confirmPin, {
  message: 'PINs komen niet overeen',
  path: ['confirmPin'],
});

// API Key name validation
export const apiKeySchema = z.object({
  name: z.string()
    .min(3, 'Naam moet minimaal 3 karakters bevatten')
    .max(50, 'Naam mag maximaal 50 karakters bevatten'),
});

// Password strength calculator
export const calculatePasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  if (score <= 2) {
    return { score, label: 'Zwak', color: 'bg-red-500' };
  } else if (score <= 4) {
    return { score, label: 'Gemiddeld', color: 'bg-yellow-500' };
  } else {
    return { score, label: 'Sterk', color: 'bg-green-500' };
  }
};

// Email validation helper
export const isValidEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

// Phone validation helper
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  return /^(\+31|0)[1-9][0-9]{8}$/.test(phone);
};

