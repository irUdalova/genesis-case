import React from 'react';
import { ICourse } from 'types';
import './course.scss';

type TCourseParam = {
  course: ICourse;
  onCourseClick: () => void;
};

export function Course({ course, onCourseClick }: TCourseParam) {
  const { title, previewImageLink, lessonsCount, description, rating } = course;

  return (
    <>
      <div className="course" onClick={onCourseClick}>
        <div className="course__preview">
          <img className="course__img" src={`${previewImageLink}/cover.webp`} alt={title} />
        </div>
        <div className="course__explanation">
          <h2 className="course__title">{title}</h2>
          <p>{description}</p>
          <p>
            <span>Skills: </span>
            <span>{course.meta.skills && course.meta.skills.map((skill) => skill).join(', ')}</span>
          </p>
          <div className="course__details">
            <p>
              Lessons: <span>{lessonsCount}</span>
            </p>
            <p>
              Rating: <span>{rating}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
