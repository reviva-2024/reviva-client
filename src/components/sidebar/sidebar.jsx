import { Menu, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { firstUlItems, secondUlItems } from './navLinks';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <aside
      className={`h-screen overflow-y-scroll ${expanded ? 'w-72' : 'w-20'} bg-white rounded-xl shadow-xl z-50`}
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
        <img
          src={`${expanded ? 'https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png' : 'https://i.ibb.co/GPG0Q8j/icon-1.png'}`}
          className={`overflow-hidden transition-all ${expanded ? 'border-b w-36 ps-0 me-10' : 'border-0 w-5'} py-6`}
          alt=""
        />
        <div className="flex flex-col h-full text-neutral-400 justify-between w-full items-center">
          <ul className="flex-1 px-3">
            {firstUlItems.map((item, index) => (
              <li
                key={index}
                className="relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-neutral-400"
              >
                {item.icon}
                <span
                  className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
                >
                  {item.text}
                </span>
              </li>
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
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

