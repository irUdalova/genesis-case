import { getCourse } from 'api/course';
import { Lesson } from 'components/lesson/lesson';
import { Loader } from 'components/loader/Loader';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICourseIDResp, IStateCourse } from 'types';
import './coursePage.scss';

export function CoursePage() {
  const initialState = {
    courseData: {} as ICourseIDResp,
    isLoading: false,
    isError: false,
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [state, setState] = useState(initialState);
  const { courseData } = state;
  console.log('courseData', courseData);

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
      <button type="button" className="back" onClick={goBack}>
        {`❮ back to courses`}
      </button>
      {state.isError && <div className="error">Something went wrong, please try again!</div>}
      <h1 className="course__title">{courseData.title}</h1>
      <p className="course__description">{courseData.description}</p>
      <div className="course__video">
        <img
          className="course__img"
          src={`${courseData.previewImageLink}/cover.webp`}
          alt={courseData.title}
          // width="auto"
          // height="100"
        />
      </div>
      {!!courseData.lessons &&
        courseData.lessons.map((lesson) => (
          <Lesson key={`${lesson.id}`} lesson={lesson} onLessonClick={() => {}} />
        ))}
    </>
  );
}
