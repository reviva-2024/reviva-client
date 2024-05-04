// Services for the User module

const API_URL = 'https://api.example.com/users';

const userService = {
  async getUserById(userId) {
    try {
      const response = await fetch(`${API_URL}/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  },
};

export default userService;
