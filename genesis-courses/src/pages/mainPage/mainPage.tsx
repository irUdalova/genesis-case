import { getCourses } from 'api/courses';
import { Loader } from 'components/loader/Loader';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICourse, IStateCourses } from 'types';
import './mainPage.scss';

export function MainPage() {
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
  return (
    <>
      {state.isLoading && <Loader />}
      {state.isError && <div className="error">Something went wrong, please try again!</div>}
      <h1>Main page</h1>

      <ul>
        {state.courses.map((course) => (
          <Link key={course.id} to={`/${course.id}`}>
            <li>{course.title}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
