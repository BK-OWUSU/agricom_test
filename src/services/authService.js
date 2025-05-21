import axios from 'axios';

const BASE_URL = "http://localhost:3001/agricom";

const AuthService = {
  login: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userData, { withCredentials: true });
      const data = response.data;
      if (response.status === 200) {
        return { success: true, user: data.user, authenticated: data.authenticated };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: "Invalid credentials" };
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      if (response.status === 200 && response.data.success) {
        return { success: true };
      } else {
        return { success: false, message: "Logout failed" };
      }
    } catch (error) {
      console.error("Logout Error:", error);
      return { success: false, message: "Server error" };
    }
  },

  fetchUser: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/me`, { withCredentials: true });
      const data = response.data;
      if (response.status === 200 && data.authenticated) {
        return { success: true, user: data.user, authenticated: true };
      } else {
        return { success: false, user: null, authenticated: false };
      }
    } catch (error) {
      console.error("Auth Check Error:", error);
      return { success: false, user: null, authenticated: false };
    }
  }
};

export default AuthService;
