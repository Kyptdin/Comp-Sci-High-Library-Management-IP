export const isbnApiLink = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;

export const getIsbnLink = (isbn: string | number | undefined): string => {
  return `${isbnApiLink}${isbn}`;
};

export const fetchBookFromIsbn = async (
  url = isbnApiLink,
  { arg }: { arg: string }
) => {
  return fetch(`${url}${arg}`).then((res) => res.json());
};
