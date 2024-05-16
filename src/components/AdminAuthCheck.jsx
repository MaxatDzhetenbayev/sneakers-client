import React, { useLayoutEffect } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const AdminAuthCheck = ({ children }) => {
  const navigate = useNavigate();

  const fetchData = () => {
    auth.onAuthStateChanged((user) => {
      if (!user  && user.email !== "admin@gmail.com") navigate('/');
    });
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return <>{children}</>;
};
