import {
  Settings,
  Menu,
  ArrowLeft,
  User2,
  Brain,
  ListVideo,
  HelpCircle,
  LucideLogOut,
} from 'lucide-react';
import React, { useState } from 'react';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const firstUlItems = [
    {
      icon: <User2 size={20} />,
      text: 'Profile',
    },
    {
      icon: <Brain size={20} />,
      text: 'Quiz',
    },
    {
      icon: <ListVideo size={20} />,
      text: 'Profile',
    },
  ];

  const secondUlItems = [
    {
      icon: <HelpCircle size={20} />,
      text: 'Help',
    },
    {
      icon: <Settings size={20} />,
      text: 'Settings',
    },
    {
      icon: <LucideLogOut size={20} />,
      text: 'Log out',
    },
  ];

  return (
    <aside className={`h-screen ${expanded ? 'w-72' : 'w-20'}`}>
      <div className="p-4 pb-2 flex   justify-end">
        <button
          onClick={toggleExpanded}
          className={`p-1.5  rounded-lg ${!expanded ? 'mx-auto' : ''}`}
        >
          {!expanded ? <Menu /> : <ArrowLeft className="border rounded text-primary" />}
        </button>
      </div>
      <nav className="h-full inline-flex flex-col items-center rounded-xl shadow-xl">
        <img
          src={`${expanded ? 'https://i.ibb.co/8MMgCSv/REVIVA-LOGO.png' : 'https://i.ibb.co/GPG0Q8j/icon-1.png'}`}
          className={`overflow-hidden  transition-all  ${expanded ? 'border-b w-36 ps-0 me-10' : 'border-0 w-5'}  py-6`}
          alt=""
        />
        <div
          className={`flex flex-col h-full text-neutral-400 justify-between w-full items-center  `}
        >
          <ul className="flex-1 px-3">
            {firstUlItems.map((item, index) => (
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

