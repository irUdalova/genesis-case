import { ICourseIDResp } from 'types';
import { getWithToken } from './helpers';
import { BASE_URL } from './constants';

export async function getCourse(id: string): Promise<ICourseIDResp> {
  return getWithToken(`${BASE_URL}core/preview-courses/${id}`);
}
