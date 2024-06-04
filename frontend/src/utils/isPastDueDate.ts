/**
 * Checks if a given return due date is in the past.
 * @param returnDueDate - The return due date to check.
 * @returns True if the return due date is in the past, false otherwise.
 */
export function isPastDueDate(returnDueDate: string): boolean {
  // Parse the input returnDueDate
  const dueDate = new Date(returnDueDate);

  // Get the current date
  const currentDate = new Date();

  // Compare the two dates
  return currentDate > dueDate;
}
