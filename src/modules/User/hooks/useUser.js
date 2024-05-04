// This directory can contain custom React hooks that encapsulate logic related to the User module. These hooks can be used across multiple components within the module to share stateful logic.

import { useState, useEffect } from 'react';
import userService from '../api/userService';

const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUserById(userId);
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, isLoading, error };
};

export default useUser;
