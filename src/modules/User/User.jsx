import React from 'react';
import UserProfile from './components/UserProfile';

const User = () => {
  // Example user ID
  const userId = '123';

  return (
    <div>
      <h1>User Module</h1>
      <UserProfile userId={userId} />
    </div>
  );
};

export default User;
