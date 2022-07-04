import React from "react";
import Head from "next/head";
import Upload from "../components/Upload";
import style from "../styles/library.module.css";

const library = () => {
  return (
    <div className={style.body}>
      <Head>
        <title>Library</title>
        <meta name="keywords" content="music, streaming, entertainment"></meta>
      </Head>
      <h1 style={{ marginTop: 0, padding: "20px" }}>Music Library here:</h1>
      <Upload />
    </div>
  );
};
export default library;
