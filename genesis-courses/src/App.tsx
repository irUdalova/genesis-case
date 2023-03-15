import { Layout } from 'components/layout/Layout';
import { MainPage } from 'pages/mainPage/mainPage';
import NotFound from 'pages/notFound/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CoursePage } from 'pages/coursePage/coursePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/:id" element={<CoursePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
