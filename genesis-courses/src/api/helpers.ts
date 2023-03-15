import { getToken } from './token';

export async function getWithToken(url: string) {
  const { token } = await getToken();

  if (!token) {
    throw new Error('Authorization error');
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Server error');
  }
  return response.json();
}
