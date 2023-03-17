import React from 'react';
import { ILesson } from 'types';
import './lesson.scss';

type TLessonParam = {
  lesson: ILesson;
  onLessonClick: () => void;
};

export function Lesson({ lesson, onLessonClick }: TLessonParam) {
  const { title, previewImageLink, status } = lesson;
  console.log('lessonData', lesson);

  return (
    <>
      <div
        className={lesson.status === 'unlocked' ? `lesson` : `lesson lesson_locked`}
        onClick={onLessonClick}
      >
        <div className="lesson__preview">
          <img
            className="lesson__img"
            src={`${previewImageLink}/lesson-${lesson.order}.webp`}
            alt={title}
            // width="auto"
            // height="100"
          />
        </div>
        <div className="lesson__description">
          <h2 className="lesson__title">{title}</h2>
          <p className="lesson__status">{status}</p>
        </div>
      </div>
    </>
  );
}
