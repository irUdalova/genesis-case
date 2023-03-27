export interface ICourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

export interface IMeta {
  slug: string;
  skills: string[];
  courseVideoPreview: ICourseVideoPreview;
  fullCourseProductId: string;
  fullCourseProductFamily: string;
}

export interface ICourse {
  id: string;
  title: string;
  tags: string[];
  launchDate: Date;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: IMeta;
}

export interface ICoursesResp {
  courses: ICourse[];
}

export interface ILesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: string;
  link: string;
  previewImageLink: string;
  meta: null;
}

export interface ICourseIDResp extends ICourse {
  lessons: ILesson[];
}

export type TTokenResp = {
  token: string;
};

export interface IPagination {
  currentPage: number;
  totalPages: number;
}

export interface IStateCourses {
  courses: ICourse[];
  isError: boolean;
  isLoading: boolean;
  pagination: IPagination;
}

export interface IStateCourse {
  courseData: ICourseIDResp | null;
  activeLessonId: string;
  isLoading: boolean;
  isError: boolean;
}
