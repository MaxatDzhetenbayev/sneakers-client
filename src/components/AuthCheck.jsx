import React, { useEffect } from "react";
import { auth } from "../firebaseConfig";
import {useNavigate } from 'react-router-dom'


export const AuthCheck = ({ children }) => {
	const navigate = useNavigate()

  const fetchData = () => {
    auth.onAuthStateChanged((user) => {
      if (!user) navigate("login");
      // console.log(`sdfsdf ${user?.email}`);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <>{children}</>;
};
