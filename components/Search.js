import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { db, getUserMusic } from "../firebase";
import style from "../styles/search.module.css";
import MusicList from "./MusicList";

function Search({
  handleClick,
  sidebar,
  setSidebar,
  userId,
  isAlbum = false,
  user,
}) {
  const [music, setMusic] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    getUserMusic(db, userId).then((data) => {
      setMusic(data);
      setFilteredMusic(data);
    });
  }, []);

  useEffect(() => {
    const searchedMusic = music.filter((music) =>
      music.name.includes(searchValue)
    );
    setFilteredMusic(searchedMusic);
  }, [searchValue]);

  return (
    <div
      className={
        sidebar ? `${style.searchcont} ${style.active}` : style.searchcont
      }
    >
      <div className={style.search}>
        <button
          className={style.searchClose}
          onClick={() => setSidebar(!sidebar)}
        >
          <FaWindowClose />
        </button>
        <h2>
          {isAlbum
            ? `Music in ${user.displayName}'s album:`
            : "Music on stream"}
        </h2>
        <input
          type="text"
          name="searchMusic"
          placeholder="Search for music"
          onChange={handleChange}
        />
        <main style={{ marginTop: "2rem" }}>
          <MusicList
            handleClick={handleClick}
            musicList={filteredMusic}
            isAlbum={isAlbum}
          />
        </main>
      </div>
    </div>
  );
}
export default Search;
