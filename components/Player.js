import React from "react";
import style from "../styles/player.module.css";
import PlayerControls from "./PlayerControls";
import PlayerDetails from "./PlayerDetails";

function Player({ play, album, currentIndex, handleClick }) {
  return (
    <div className={style.cplayer}>
      {play ? <h4>Playing now</h4> : <h4>Pick music do you wanna play</h4>}
      <div className={style.playerWrapper}>
        {play && (
          <PlayerDetails
            title={play?.name}
            image={play?.image}
            author={play?.author}
          />
        )}
        <PlayerControls
          song={album}
          currentIndex={currentIndex}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
export default Player;
