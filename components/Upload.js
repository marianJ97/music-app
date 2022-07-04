import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import style from "../styles/library.module.css";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Upload() {
  const [fileUrl, setFileUrl] = useState(null);
  const [musicUrl, setMusicUrl] = useState(null);
  const [disable, setDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (musicUrl !== null && fileUrl !== null) {
      setDisable(false);
      alert("click on submit");
    }
  }, [musicUrl, fileUrl]);

  const filechanged = async (e) => {
    const file = e.target.files[0];
    const fileRef = ref(storage, `Image/${e.target.files[0].name}`);

    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("Error occured during uplaoding:", error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Image available at", downloadURL);
          setFileUrl(downloadURL);
        });
      }
    );
  };

  const musicchanged = async (e) => {
    const music = e.target.files[0];
    const musicRef = ref(storage, `Music/${e.target.files[0].name}`);

    const uploadTask = uploadBytesResumable(musicRef, music);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("Error occured during uplaoding:", error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Music available at", downloadURL);
          setMusicUrl(downloadURL);
        });
      }
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    const musicname = e.target.musicname.value;
    const authorname = e.target.musicauthor.value;
    if (!musicname || !authorname || !user) {
      return;
    }

    try {
      const musicCol = collection(db, "Music");
      const musicRef = await addDoc(musicCol, {
        name: musicname,
        music: musicUrl,
        image: fileUrl,
        author: authorname,
        userId: user.uid,
      });

      setSuccess(true);
      console.log("Document written with ID: ", musicRef);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className={style.uploadpage}>
      <form onSubmit={submit} className={style.uploadform}>
        <label>Song cover</label>
        <input
          type="file"
          className={style.myfile}
          name="img"
          onChange={filechanged}
          required
        />
        <label>Music source</label>
        <input type="file" name="music" onChange={musicchanged} required />
        <label>Song name</label>
        <input type="text" name="musicname" placeholder="Music name" required />
        <label>Author</label>
        <input
          type="text"
          name="musicauthor"
          placeholder="Author name"
          required
        />
        <button className={style.btn} disabled={disable}>
          Submit
        </button>
        {success && (
          <span style={{ color: "greenyellow" }}>
            Music was uploaded succesfully!
          </span>
        )}
      </form>
    </div>
  );
}
export default Upload;
