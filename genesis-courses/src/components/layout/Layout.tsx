import { Outlet } from 'react-router-dom';
import React from 'react';
import './Layout.css';

export const Layout = () => {
  return (
    <>
      <header className="header">
        <div className="header__logo"></div>
        {/* <p className="header__moto">Become a Better You</p> */}
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
