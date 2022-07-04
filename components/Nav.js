import React from "react";
import Link from "next/link";
import style from "../styles/nav.module.css";
import { useAuth } from "../context/AuthContext";

function Nav() {
  const { user, logout } = useAuth();

  return (
    <ul className={style.nav}>
      <div>
        <li>
          <Link href="/">Music Streaming</Link>
        </li>
      </div>
      <div className={style.navUtil}>
        {user && (
          <li>
            <Link href="/library">Upload music</Link>
          </li>
        )}
        {user && (
          <li>
            <Link href="/users">Users</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link href="/register">Register</Link>
          </li>
        )}
        {user && (
          <li style={{ cursor: "pointer" }} onClick={() => logout()}>
            <button>Logout</button>
          </li>
        )}
      </div>
    </ul>
  );
}
export default Nav;
