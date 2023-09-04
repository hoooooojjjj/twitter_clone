import { auth } from "../Myfirebase";
import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const providergoogle = new GoogleAuthProvider();
  const providergithub = new GithubAuthProvider();

  const onSocailClick = (e) => {
    const {
      target: { name },
    } = e;
    if (name === "google") {
      signInWithPopup(auth, providergoogle)
        .then((result) => {})
        .catch((error) => {});
    } else if (name === "github") {
      signInWithPopup(auth, providergithub)
        .then((result) => {})
        .catch((error) => {});
    }
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocailClick}>
          구글로 로그인
        </button>
        <button name="github" onClick={onSocailClick}>
          깃허브로 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
