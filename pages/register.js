import React, { useState } from "react";
import Head from "next/head";
import style from "../styles/login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const register = () => {
  const [error, setError] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      updateProfile(user, {
        displayName: username,
      });
      await setDoc(doc(db, "Users", user.uid), {
        displayName: username,
        email: email,
        photoUrl: "",
      });

      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.container}>
      <Head>
        <title>register</title>
        <meta name="keywords" content="music, streaming, entertainment"></meta>
      </Head>
      <div className={style.form}>
        <h1>Account register</h1>
        <form onSubmit={handleRegister}>
          <input type="text" name="username" placeholder="username" />
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <button type="submit">Submit</button>
          {error && <span>Wrong email or password!</span>}
        </form>
      </div>
    </div>
  );
};
export default register;
