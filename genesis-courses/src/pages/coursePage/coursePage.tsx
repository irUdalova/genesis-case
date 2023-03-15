import { getCourse } from 'api/course';
import { Loader } from 'components/loader/Loader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICourseIDResp, IStateCourse } from 'types';
import './coursePage.scss';

export function CoursePage() {
  const initialState = {
    courseData: {} as ICourseIDResp,
    isLoading: false,
    isError: false,
  };
  const { id } = useParams();

  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((currentState: IStateCourse) => ({
      ...currentState,
      isError: false,
      isLoading: true,
    }));
    if (id) {
      getCourse(id)
        .then((data) => {
          setState((currentState: IStateCourse) => ({
            ...currentState,
            courseData: data,
            isLoading: false,
            isError: false,
          }));
        })
        .catch(() => {
          setState((currentState: IStateCourse) => ({
            ...currentState,
            isError: true,
            isLoading: false,
          }));
        });
    }
  }, [id]);

  if (state.isLoading) return <Loader />;

  return (
    <>
      {state.isError && <div className="error">Something went wrong, please try again!</div>}
      <h1>Course</h1>
      {state.courseData.lessons &&
        state.courseData.lessons.map((lesson) => <p key={lesson.id}>{lesson.title}</p>)}
    </>
  );
}
