import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile">
      <button
        className="button button__red"
        onClick={() => {
          signOut(auth);
          navigate("");
        }}
      >
        Выйти с аккаунта
      </button>
    </div>
  );
};
