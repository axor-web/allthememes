export const getMemes = async () => {
  const response = await fetch('http://localhost:3001/memes', { next: { revalidate: 10 } });
  const memes = await response.json();

  return memes;
}