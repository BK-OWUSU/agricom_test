import PropTypes from "prop-types";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { useState, useEffect } from "react";
// import AuthService from "@/services/authService";

const testUser = {
  firstname: 'Derrick', 
  lastname: 'Doe', 
  email: 'admin@agricom.com',
  password: "admin", 
  fullname: 'Derrick Doe', 
  role: 'Super_Admin',
  access: ['dashboard', 'notification', 'audit-trails', 'sms-messages', 'farmers', 'manage-farmer', 'farmland-details', 'crops', 'crops-yields', 'farm-activity', 'income-exp', 'expenditure', 'income', 'loans', 'insurance-claims', 'users', 'employees', 'manage-users', 'user-logs', 'reports', 'financial-report', 'crops-reports', 'farmers-report', 'farmland-report', 'employees-report', 'weather-report', 'settings', 'manage-categories', 'access-control', 'system-params'],
  permissions: ['Export', 'Import', 'Create', 'Delete', 'Edit']
}

export function AuthUserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("authenticated") === "true");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     setLoading(true);
  //     const result = await AuthService.fetchUser();
  //     if (result.success) {
  //       setUser(result.user);
  //       setAuthenticated(true);
  //       sessionStorage.setItem("authenticated", "true");
  //     }else{
  //       setUser(null);
  //       setAuthenticated(false);
  //       sessionStorage.removeItem("authenticated");
  //     }
  //     setLoading(false);
  //   };
  //   initializeAuth();
  // }, []);
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setAuthenticated(true);
        sessionStorage.setItem("authenticated", "true");
      }else{
        setUser(null);
        setAuthenticated(false);
        sessionStorage.removeItem("authenticated");
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);  
  
  // useEffect(() => {
  //   if (user) {
  //     sessionStorage.setItem("user", JSON.stringify(user));
  //   } else {
  //     sessionStorage.removeItem("user");
  //   }
  // }, [user]);

  // const login = async (userData) => {
  //   setLoading(true);
  //   const result = await AuthService.login(userData);
  //   if (result.success) {
  //     setUser(result.user);
  //     setAuthenticated(true);
  //     sessionStorage.setItem("authenticated", "true");
  //     sessionStorage.setItem("user", JSON.stringify(testUser));
  //   }
  //   setLoading(false);
  //   return result;
  // };
//A Login for testing purposes

const testLogin = async (userData) => {
  setLoading(true);
  const email = userData.email;
  const passwordLogin = userData.password;
  const {password, ...userWithoutPassword} = testUser;
  const success = email === testUser.email && passwordLogin === password;
    if (success) {
      setUser(userWithoutPassword);
      setAuthenticated(true);
      sessionStorage.setItem("authenticated", "true");
    }
    setLoading(false);
    return {
      user: userWithoutPassword,
      success: true  
    };
  };
  
//A logout for testing purposes
  const testLogout = async () => {
    setLoading(true);
      setUser(null);
      setAuthenticated(false);
      sessionStorage.removeItem("authenticated");
      sessionStorage.removeItem("user");
    setLoading(false);
  }; 
  
  // const logout = async () => {
  //   setLoading(true);
  //   const result = await AuthService.logout();
  //   if (result.success) {
  //     setUser(null);
  //     setAuthenticated(false);
  //     sessionStorage.removeItem("authenticated");
  //     sessionStorage.removeItem("user");
  //   }
  //   setLoading(false);
  // };

  return (
    <AuthUserContext.Provider value={{ user, authenticated, loading, testLogin, testLogout }}>
      {children}
    </AuthUserContext.Provider>
  );
}

AuthUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
