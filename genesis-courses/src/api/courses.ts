import { ICoursesResp } from 'types';
import { getWithToken } from './helpers';
import { BASE_URL } from './constants';

export async function getCourses(): Promise<ICoursesResp> {
  return getWithToken(`${BASE_URL}core/preview-courses`);
}
