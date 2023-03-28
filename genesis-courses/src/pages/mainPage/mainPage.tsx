import { getCourses } from 'api/courses';
import { Course } from 'components/course/course';
import { Loader } from 'components/loader/Loader';
import { Pagination } from 'components/pagination/Pagination';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICourse, IStateCourses } from 'types';
import './mainPage.scss';

export function MainPage() {
  const [queryParams, setQueryParams] = useSearchParams();
  const navigate = useNavigate();
  const pageQuery = Number(queryParams.get('page'));

  const initialState = {
    courses: [] as ICourse[],
    isError: false,
    isLoading: false,
    pagination: {
      currentPage: 1,
      totalPages: 0,
    },
  };
  const [state, setState] = useState<IStateCourses>(initialState);

  useEffect(() => {
    setState((currentState: IStateCourses) => ({
      ...currentState,
      isError: false,
      isLoading: true,
    }));

    getCourses()
      .then((data) => {
        setState((currentState: IStateCourses) => ({
          ...currentState,
          courses: data.courses,
          isLoading: false,
          isError: false,
          pagination: {
            ...currentState.pagination,
            totalPages: Math.ceil(data.courses.length / 10),
          },
        }));
      })
      .catch(() => {
        setState((currentState: IStateCourses) => ({
          ...currentState,
          isError: true,
          isLoading: false,
        }));
      });
  }, []);

  useEffect(() => {
    setState((currentState: IStateCourses) => ({
      ...currentState,
      pagination: {
        ...currentState.pagination,
        currentPage: pageQuery || 1,
      },
    }));
  }, [pageQuery]);

  const ITEMS_PER_PAGE = 10;
  const startItem = (state.pagination.currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = startItem + ITEMS_PER_PAGE;

  return (
    <>
      {state.isLoading && <Loader />}
      {state.isError && <div className="error">Something went wrong, please try again!</div>}
      {state.courses.slice(startItem, endItem).map((course: ICourse) => (
        <Course
          key={`${course.id}`}
          course={course}
          onCourseClick={() => {
            navigate(`/${course.id}`);
          }}
        />
      ))}

      {!!state.courses.length && (
        <Pagination
          totalPages={state.pagination.totalPages}
          currentPage={state.pagination.currentPage}
          onPageClick={(num: number) => {
            setQueryParams({ ...Object.fromEntries(queryParams.entries()), page: num.toString() });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </>
  );
}
