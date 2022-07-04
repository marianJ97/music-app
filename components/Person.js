import React, { useEffect, useState } from "react";
import { db, getUserMusic } from "../firebase";
import style from "../styles/users.module.css";

function Person({ person, handleClick }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getUserMusic(db, person.id).then((data) => setCount(data.length));
  }, []);

  return (
    <li className={style.li} onClick={() => handleClick(person)}>
      <div
        style={{
          borderRadius: "5px",
          border: "4px solid #450e80",
          margin: 0,
          padding: 0,
          height: "52px",
        }}
      ></div>
      <div className={style.user}>
        <span>{person.displayName}</span>
        <span>
          Songs in playlist: <strong>{count}</strong>
        </span>
      </div>
    </li>
  );
}

export default Person;
