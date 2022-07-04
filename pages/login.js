import React, { useState } from "react";
import Head from "next/head";
import style from "../styles/login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const login = () => {
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    login(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className={style.container}>
      <Head>
        <title>login</title>
        <meta name="keywords" content="music, streaming, entertainment"></meta>
      </Head>
      <div className={style.form}>
        <h1>Account login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <button type="submit">Submit</button>
        </form>
        {error && <span>Wrong email or password!</span>}
      </div>
    </div>
  );
};
export default login;
