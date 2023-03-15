import { Outlet } from 'react-router-dom';
import React from 'react';
import './Layout.css';

export const Layout = () => {
  return (
    <>
      <header className="header"></header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
