import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import style from "../styles/player.module.css";

function PlayerControls({ song, currentIndex, handleClick }) {
  return (
    <div className={style.playercontrols}>
      <AudioPlayer
        className={style.rhap_container}
        layout="stacked-reverse"
        autoPlay
        src={song[currentIndex]?.music}
        onPlay={(e) => console.log("onPlay")}
        onClickNext={() =>
          handleClick(
            currentIndex < song.length - 1 ? currentIndex + 1 : 0,
            song
          )
        }
        onClickPrevious={() =>
          handleClick(
            currentIndex === 0 ? song.length - 1 : currentIndex - 1,
            song
          )
        }
        // other props here
        showSkipControls
        autoPlayAfterSrcChange
      />
    </div>
  );
}
export default PlayerControls;
