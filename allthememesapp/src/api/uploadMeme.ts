import IMeme from "@/types/IMeme";

export const uploadMeme = async (meme: IMeme) => {
  const response = await fetch(
    'http://localhost:3001/meme',
    {
      next: { revalidate: 0 },
      method: 'POST',
      body: JSON.stringify(meme),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.ok) {
    return true;
  }

  return false;
}