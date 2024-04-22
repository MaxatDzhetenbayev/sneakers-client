import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.user) {
        navigate("/");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="form">
      <h1>Регистрация</h1>
      <input
        className="input"
        type="text"
        placeholder="Введите ваш логин"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Введите ваш пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button button__green" onClick={handleSignIn}>
        Зарегестрироваться
      </button>
    </div>
  );
};
