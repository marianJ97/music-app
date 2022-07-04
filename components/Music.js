import Image from "next/image";
import React from "react";

function Music({ music, handleClick, musicList, musicId }) {
  return (
    <li onClick={() => handleClick(musicId, musicList)}>
      <div
        style={{
          borderRadius: "5px",
          border: "1px solid #450e80",
          margin: 0,
          padding: 0,
          height: "52px",
        }}
      >
        <Image
          style={{ borderRadius: "5px" }}
          src={music.image}
          width={50}
          height={50}
        />
      </div>
      <span>{music.name}</span>
    </li>
  );
}

export default Music;
