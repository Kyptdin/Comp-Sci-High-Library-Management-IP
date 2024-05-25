export function isPastDueDate(returnDueDate: string): boolean {
  // Parse the input returnDueDate
  const dueDate = new Date(returnDueDate);

  // Get the current date
  const currentDate = new Date();

  // Compare the two dates
  return currentDate > dueDate;
}
