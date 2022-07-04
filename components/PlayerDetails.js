import Image from "next/image";
import React from "react";
import style from "../styles/player.module.css";

function PlayerDetails({ title, author, image }) {
  return (
    <div className={style.playerdetails}>
      <div className={style.detailsimg}>
        <Image src={image} width={250} height={250} />
      </div>
      <h3 className={style.detailstitle}>{title}</h3>
      <p>{author}</p>
    </div>
  );
}
export default PlayerDetails;
