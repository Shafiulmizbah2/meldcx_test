import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
const userContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = async () => {
    const loggedUser = await JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
      navigate("/", {
        replace: true,
      });
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    setError("");
    if (email && password) {
      try {
        const res = await AxiosInstance.post("/login", { email, password });

        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        AxiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data}`;

        navigate("/", {
          replace: true,
        });
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
      }
    } else {
      setLoading(false);
      if (!email) {
        setError("Email is a required field!");
      } else if (!password) {
        setError("password is a required field!");
      } else {
        setError("Email & password is a required field!");
      }
    }
  };

  const logOut = async () => {
    setLoading(false);
    setError("");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    isLoggedIn();
  }, [user]);

  return (
    <userContext.Provider value={{ user, loading, error, signIn, logOut }}>
      {children}
    </userContext.Provider>
  );
};

const useAuth = () => useContext(userContext);

export default useAuth;
