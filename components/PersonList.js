import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db, getUsers } from "../firebase";
import style from "../styles/search.module.css";
import Person from "./Person";

function PersonList({ searchValue }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getUsers(db).then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  useEffect(() => {
    const searchedUsers = users.filter((user) =>
      user.displayName.includes(searchValue)
    );
    setFilteredUsers(searchedUsers);
  }, [searchValue]);

  const handleClick = (uid) => {
    router.push(`/album/${uid}`);
  };

  return (
    <div className={style.content}>
      {!filteredUsers.length && <p>Here arent users right now!</p>}
      <ul className={style.list}>
        {filteredUsers.map((user, index) => (
          <Person
            handleClick={() => handleClick(user.id)}
            person={user}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
}

export default PersonList;
