import { createContext } from "react";

//User context to globally share user data
export const AuthUserContext = createContext({
    user: null,
    authenticated: false,
    loading: true,
    login: async () => {},
    logout: async () => {},
});