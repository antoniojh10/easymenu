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
  email: string;
};

type FirebaseAPI = {
  registerNewUser({
    id,
    firstName,
    lastName,
    email
  }: newUserInputs): Promise<void>;
};

export async function registerNewUser({
  id,
  firstName,
  lastName,
  email
}: newUserInputs): Promise<void> {
  try {
    await usersCollection.doc(id).set({
      id,
      firstName,
      lastName,
      email
    });
  } catch (error) {
    console.error(error);
  }
}
