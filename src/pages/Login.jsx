import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        navigate("/");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="form">
      <h1>Войти</h1>
      <input
        className="input"
        type="text"
        placeholder="Введите ваш логин"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        placeholder="Введите ваш пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/register">Нет аккаунта?</Link>
      <button className="button button__green" onClick={handleSignIn}>
        Войти
      </button>
    </div>
  );
};
