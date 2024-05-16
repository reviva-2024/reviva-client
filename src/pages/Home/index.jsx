import React from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex w-full gap-6">
      {/* Copy this div and return it from Home.jsx */}
      <aside className="h-screen px-24 py-6 bg-primary bg-opacity-20">
        Sidebar{/* Add sidebar component here after creating the homepage*/}
      </aside>
      <Outlet />
    </div>
  );
};

export default Home;
