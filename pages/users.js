import Head from "next/head";
import PersonList from "../components/PersonList";
import style from "../styles/users.module.css";

export default function Users() {
  return (
    <div>
      <Head>
        <title>Music Application</title>
        <meta name="keywords" content="music, streaming, entertainment"></meta>
      </Head>
      <div className={style.body}>
        <h3 className={style.title}>User list</h3>
        <div>
          <input placeholder="Search for a user" />
        </div>
        <PersonList />
      </div>
    </div>
  );
}
