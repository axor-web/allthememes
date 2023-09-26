export const deleteMeme = async (id: string) => {
  if (!id) {
    return false;
  }

  const response = await fetch(`http://localhost:3001/deletememe?id=${id}`, {
    next: { revalidate: 3600 },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    return false;
  }

  return true;
};
