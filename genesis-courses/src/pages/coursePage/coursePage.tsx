import { getCourse } from 'api/course';
import { Lesson } from 'components/lesson/lesson';
import { Loader } from 'components/loader/Loader';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IStateCourse } from 'types';
import './coursePage.scss';
import { VideoPlay } from 'components/video/videoPlay';

export function CoursePage() {
  const initialState = {
    courseData: null,
    activeLessonId: '',
    isLoading: true,
    isError: false,
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;

  const [state, setState] = useState<IStateCourse>(initialState);
  const { courseData } = state;

  const setActiveLesson = (id: string) =>
    setState((currentState: IStateCourse) => ({
      ...currentState,
      activeLessonId: id,
    }));

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
            activeLessonId: data.lessons[0].id,
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
  const activeLesson = courseData?.lessons.find((lesson) => lesson.id === state.activeLessonId);

  if (state.isLoading || !activeLesson) return <Loader />;

  return (
    <>
      <button type="button" className="back" onClick={goBack}>
        {`❮ back to courses`}
      </button>
      {state.isError && <div className="error">Something went wrong, please try again!</div>}
      <h1 className="course__title">{courseData!.title}</h1>
      <p className="course__description">{courseData!.description}</p>
      <div className="course__video">
        {
          <VideoPlay
            videoRef={videoRef}
            src={activeLesson?.link}
            poster={
              `${activeLesson.previewImageLink}/lesson-${activeLesson.order}.webp` ||
              '/assets/img/no-img.webp'
            }
          />
        }
      </div>
      {
        <h2 className="lesson__title--active">
          <span>{`Lesson ${activeLesson.order}: `}</span>
          {activeLesson.title}
        </h2>
      }
      {courseData!.lessons.map((lesson) => (
        <Lesson
          key={`${lesson.id}`}
          isActive={state.activeLessonId === lesson.id}
          lesson={lesson}
          onLessonClick={() => {
            setActiveLesson(lesson.id);
          }}
        />
      ))}
    </>
  );
}
