import { Settings, User2, Brain, ListVideo, HelpCircle, LucideLogOut } from 'lucide-react';

export const firstUlItems = [
  {
    icon: <User2 size={22} />,
    name: 'Profile',
    route: '/auth/profile',
  },
  {
    icon: <Brain size={22} />,
    name: 'Quiz',
    route: '/quiz',
  },
  {
    icon: <ListVideo size={22} />,
    name: 'Courses',
  },
];

export const secondUlItems = [
  // {
  //   icon: <HelpCircle size={22} />,
  //   name: 'Help',
  // },
  // {
  //   icon: <Settings size={22} />,
  //   name: 'Settings',
  // },
  {
    icon: <LucideLogOut size={22} />,
    name: 'Log out',
  },
];

