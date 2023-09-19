export const getMemes = async (hashtags?: string[]) => {
  const response = await fetch(
    'http://localhost:3001/memes',
    {
      next: { revalidate: 100 },
      method: 'GET',
      headers: {
        hashtags: JSON.stringify(hashtags || [])
      }
    }
  );
  
  if (response.status == 404) {
    return [];
  }

  const memes = await response.json();

  return memes;
}