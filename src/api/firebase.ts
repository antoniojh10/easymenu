import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-wlTqNkTqOxdJbYtLC6h09hquaHmfKUE",
  authDomain: "react-login---typescript.firebaseapp.com",
  projectId: "react-login---typescript",
  storageBucket: "react-login---typescript.appspot.com",
  messagingSenderId: "833609458712",
  appId: "1:833609458712:web:2ebba9f1f9cabc5f710f6d",
  measurementId: "G-F12NHK5WG4"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const usersCollection = db.collection("users");

type newUserInputs = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

export async function uniqueUserName(userName: string) {
  try {
    return await usersCollection
      .where("username", "==", userName.toLowerCase())
      .get()
      .then((response) => {
        if (response.size > 0) {
          return { code: "auth/username-already-in-use" };
        } else {
          return undefined;
        }
      });
  } catch (error) {
    console.error(error);
  }
}

export async function registerNewUser(userData: newUserInputs): Promise<void> {
  try {
    const username = userData.username.toLowerCase();
    await usersCollection.doc(userData.id).set({
      ...userData,
      username
    });
  } catch (error) {
    console.error(error);
  }
}
