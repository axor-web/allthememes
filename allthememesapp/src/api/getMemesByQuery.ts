export const getMemesByQuery = async (query: string) => {
  const response = await fetch(
    'http://localhost:3001/memesByQuery',
    {
      next: { revalidate: 100 },
      method: 'GET',
      headers: {
        query: JSON.stringify(query)
      }
    }
  );
  
  if (response.status == 404) {
    return [];
  }

  const memes = await response.json();

  return memes;
}