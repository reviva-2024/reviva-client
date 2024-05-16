import React from 'react';
import { Outlet } from 'react-router-dom';
import QuizSection from './components/quizSection';
import Sidebar from '../../components/sidebar/sidebar';

const Home = () => {
  return (
    <div className="flex w-full ">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
