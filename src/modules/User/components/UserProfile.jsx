// Components specific to the User module

import React from 'react';
import { useUser } from '../hooks/useUser';
import formatDate from '../utils/formatDate';

const UserProfile = ({ userId }) => {
  const { user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Joined: {formatDate(user.joinedDate)}</p>
    </div>
  );
};

export default UserProfile;
