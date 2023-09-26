export const deleteMeme = async (id: string) => {
  if (!id) {
    return false;
  }

  const response = await fetch(`http://localhost:3001/deletememe/${id}`, {
    next: { revalidate: 3600 },
    method: 'POST',
  });

  if (response.status !== 200) {
    return false;
  }

  return true;
};
