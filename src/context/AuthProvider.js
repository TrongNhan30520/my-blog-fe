import React, { useState, useEffect, createContext, useMemo } from "react";
import apiInstance from "../apis/apiInstance";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [signInSuccess, setSignInSuccess] = useState(false);

  const getCurrentUser = async () => {
    try {
      const result = await apiInstance.get("/users/profile");
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await apiInstance.post("auth/login", {
        email,
        password,
      });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      setSignInSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    if (signInSuccess) {
      getCurrentUser();
    }
  }, [signInSuccess]);

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
