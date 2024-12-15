import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const restAPI = process.env.REACT_APP_HASURA_API_REST;
  const apiSecret = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();
  const location = useLocation();

  const [userAuth, setUserAuth] = useState({
    loggedInUser: {},
    isLoggedIn: false,
  });
  const [message, setMessage] = useState({});

  const login = async (username, password) => {
    try {
      const response = await fetch(`${restAPI}/login`, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": apiSecret,
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (result.user_registry[0]?.username === username) {
        setUserAuth({
          loggedInUser: result.user_registry[0],
          isLoggedIn: true,
        });
        const from = location.state?.from?.pathname || "/reports";
        navigate(from);
      } else {
        setUserAuth({ loggedInUser: {}, isLoggedIn: false });
        setMessage({ error: "Invalid Credentials" });
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await fetch(`${restAPI}/signup`, {
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": apiSecret,
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Response status is not in the range 200-299
        const errorData = await response.json(); // Parse error response if it's JSON
        throw new Error(`${errorData?.error || "Unknown error"}`);
      }

      const result = await response.json();
      if (result?.insert_user_registry?.affected_rows) {
        setMessage({ message: "SignUp Success! Please Login." });
      }
    } catch (error) {
      setMessage({ error: "Username Unavailable" });
      console.log(error.message);
    }
  };

  const logout = () => {
    setUserAuth({ loggedInUser: {}, isLoggedIn: false });
    navigate("/login");
  };

  const value = {
    signup,
    login,
    logout,
    userAuth,
    message,
    setMessage,
  };

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export const useAuth = () => useContext(Auth);
