import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Зарегестрироваться</button>
    </div>
  );
};
