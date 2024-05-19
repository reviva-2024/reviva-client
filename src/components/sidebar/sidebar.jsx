import { Menu, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { firstUlItems, secondUlItems } from './navLinks';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <aside
      className={`h-screen fixed z-40 overflow-y-hidden ${expanded ? 'w-72' : 'w-20'} bg-white rounded-xl shadow-xl z-50`}
    >
      <div className="p-4 pb-2 flex justify-end">
        <button
          onClick={toggleExpanded}
          className={`p-1.5 rounded-lg ${!expanded ? 'mx-auto' : ''}`}
        >
          {!expanded ? (
            <Menu />
          ) : (
            <ArrowLeft className="border border-neutral-400 rounded text-primary" />
          )}
        </button>
      </div>
      <nav className="h-full inline-flex flex-col items-center">
        <Link to={'/'}>
          <img
            src={`${expanded ? 'https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png' : 'https://i.ibb.co/GPG0Q8j/icon-1.png'}`}
            className={`overflow-hidden transition-all ${expanded ? 'border-b w-36 ps-0 me-10' : 'border-0 w-5'} py-6 hover:cursor-pointer`}
            alt=""
          />
        </Link>
        <div className="flex flex-col h-full text-neutral-400 justify-between w-full items-center">
          <ul className="flex-1 px-3">
            {firstUlItems.map((item, index) => (
              <Link key={index} to={item.route}>
                <li className="relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-neutral-400">
                  {item.icon}
                  <span
                    className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
                  >
                    {item.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>

          <ul className="flex-1 p-3 bottom-0 absolute">
            {secondUlItems.map((item, index) => (
              <li
                key={index}
                className="relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
              >
                {item.icon}
                <span
                  className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

