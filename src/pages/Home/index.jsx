import React from 'react';
import { Outlet } from 'react-router-dom';
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
