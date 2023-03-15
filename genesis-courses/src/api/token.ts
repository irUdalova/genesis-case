import { TTokenResp } from 'types';
import { BASE_URL } from './constants';

export async function getToken(): Promise<TTokenResp> {
  const res = await fetch(`${BASE_URL}auth/anonymous?platform=subscriptions`);
  return res.json();
}
