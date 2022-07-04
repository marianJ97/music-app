import React from "react";
import style from "../styles/search.module.css";
import Music from "./Music";

function MusicList({ handleClick, musicList, isAlbum = false }) {
  return (
    <div className={style.content}>
      <h3 style={{ paddingTop: "25px" }}>
        {isAlbum ? "User playlist:" : "My playlist:"}
      </h3>
      {!musicList.length && <p>Playlist is empty, first add your music!</p>}
      <ul className={style.list}>
        {musicList.map((music, index) => (
          <Music
            handleClick={handleClick}
            music={music}
            key={index}
            musicId={index}
            musicList={musicList}
          />
        ))}
      </ul>
    </div>
  );
}

export default MusicList;
