import { EMAIL_REGEXP } from './regexp';

/**
 * Validates if a Email is valid
 * @param {string} email
 */
export const isValidEmail = (email: string) => EMAIL_REGEXP.test(email);
