import React from 'react';
import { ILesson } from 'types';
import cn from 'classnames';
import './lesson.scss';
import { Preview } from 'components/preview/preview';

type TLessonParam = {
  lesson: ILesson;
  isActive: boolean;
  onLessonClick: () => void;
};

export function Lesson({ lesson, isActive, onLessonClick }: TLessonParam) {
  const { title, previewImageLink, status } = lesson;
  const isLocked = lesson.status === 'locked';

  return (
    <>
      <div
        className={cn('lesson', `lesson--${lesson.status}`, { 'lesson--active': isActive })}
        onClick={() => !isLocked && onLessonClick()}
      >
        <div className="lesson__preview">
          <Preview
            className="lesson__img"
            path={`${previewImageLink}/lesson-${lesson.order}.webp`}
            title={title}
          />
        </div>
        <div className="lesson__description">
          <h2 className="lesson__title">{title}</h2>
          <p className={cn(`lesson__status--${lesson.status}`)}></p>
        </div>
      </div>
    </>
  );
}
