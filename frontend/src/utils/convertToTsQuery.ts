export function convertToTsQuery(input: string): string {
  // Split the input string into individual words
  const words = input.trim().split(" ");
  // Enclose each word in single quotes and join them with ' & '
  const tsQuery = words.map((word) => `'${word}'`).join(" & ");
  // use the following only for websearch
  // const tsQuery = `'${words.join(" or ")}'`;
  console.log(tsQuery);
  return tsQuery;
}
