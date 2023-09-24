export const getBinaryImage = async (id: string) => {
  if (!id) {
    return {};
  }

  const response = await fetch(`http://localhost:3001/binaryimage/${id}`, {
    next: { revalidate: 3600 },
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 404) {
    return {};
  }

  const image = await response.json();

  return image;
};
