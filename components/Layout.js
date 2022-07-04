import React from "react";
import style from "../styles/layout.module.css";
import Nav from "./Nav";
import { FaBars } from "react-icons/fa";

const Layout = ({ children, setSidebar, sidebar }) => {
  return (
    <div className={style.container}>
      <Nav />
      {children}
      <div className={style.footer}>
        <h3>Browse and listen to music of your choice</h3>
      </div>
    </div>
  );
};
export default Layout;
