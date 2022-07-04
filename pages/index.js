import Head from "next/head";
import { useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import Player from "../components/Player";
import Search from "../components/Search";
import { useAuth } from "../context/AuthContext";
import style from "../styles/arrangement.module.css";

export default function Home({ sidebar, setSidebar }) {
  const [playing, setPlaying] = useState(null);
  const [album, setAlbum] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();

  const handleClick = (musicId, musicList) => {
    setPlaying(musicList[musicId]);
    setAlbum(musicList);
    setCurrentIndex(musicId);
    setSidebar(false);
  };

  return (
    <div className={style.maincont}>
      <Head>
        <title>Music Application</title>
        <meta name="keywords" content="music, streaming, entertainment"></meta>
      </Head>
      <div className={style.btn}>
        <button onClick={() => setSidebar(!sidebar)}>
          <MdDoubleArrow />
          Open album
        </button>
      </div>

      <Search
        sidebar={sidebar}
        handleClick={handleClick}
        setSidebar={setSidebar}
        userId={user.uid}
      />
      <Player
        play={playing}
        album={album}
        currentIndex={currentIndex}
        handleClick={handleClick}
      />
    </div>
  );
}
