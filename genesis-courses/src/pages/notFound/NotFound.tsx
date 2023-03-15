import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <h1 className="title">404</h1>
        <p>Page not found, please go to the</p>
        <NavLink className="main-link" to="/">
          main page
        </NavLink>
      </div>
    </>
  );
}
