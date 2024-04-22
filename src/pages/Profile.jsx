import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
export const Profile = () => {
  return (
    <div className="profile">
      <button className="button button__red" onClick={() => signOut(auth)}>
        Выйти с аккаунта
      </button>
    </div>
  );
};
