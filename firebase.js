import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIOR2rgygjWwLFij85hYkEfsymqsD-fIw",
  authDomain: "music-application-ce8c4.firebaseapp.com",
  projectId: "music-application-ce8c4",
  storageBucket: "music-application-ce8c4.appspot.com",
  messagingSenderId: "618783165597",
  appId: "1:618783165597:web:1d524547a6f938ec025874",
  measurementId: "G-ZMFLR5CMDV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

export async function getMusic(db) {
  const musicCol = collection(db, "Music");
  const musicSnapshot = await getDocs(musicCol);
  const musicList = musicSnapshot.docs.map((doc) => doc.data());

  return musicList;
}

export async function getUsers(db) {
  const usersCol = collection(db, "Users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return usersList;
}

export async function getUser(db, userId) {
  const usersCol = doc(db, "Users", userId);
  const userSnapshot = await getDoc(usersCol);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  }
}

export async function getUserMusic(db, uid) {
  const musicQuery = query(collection(db, "Music"), where("userId", "==", uid));
  const musicSnapshot = await getDocs(musicQuery);
  const musicList = musicSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return musicList;
}

// export async function getMusic(db) {
//   const musicCol = collection(db, "Music");
//   const musicSnapshot = await getDocs(musicCol);
//   const musicList = musicSnapshot.docs.map((doc) => doc.data());
//   return musicList;
// }

// !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig).firestore()
//   : firebase.app().firestore();
// const db = firebase.firestore();

// export default db;
