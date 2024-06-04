/**
 * Checks if a given string is a valid email address.
 * @param email - The email address to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const isEmail = (email: string): boolean => {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};
