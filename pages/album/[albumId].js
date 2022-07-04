import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import Player from "../../components/Player";
import Search from "../../components/Search";
import { db, getUser } from "../../firebase";
import style from "../../styles/arrangement.module.css";

export default function Album({ sidebar, setSidebar }) {
  const [playing, setPlaying] = useState(null);
  const [album, setAlbum] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { query } = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(db, query.albumId).then((data) => setUser(data));
  }, []);

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
        userId={query.albumId}
        user={user}
        isAlbum
      />
      <div>
        <Player
          play={playing}
          album={album}
          currentIndex={currentIndex}
          handleClick={handleClick}
        />
        <h3>{user && `Album of user: ${user.displayName}`}</h3>
      </div>
    </div>
  );
}
