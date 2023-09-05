import { auth } from "../Myfirebase";
import React, { useEffect } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "로그인";
  });

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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocailClick} name="google" className="authBtn">
          구글로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocailClick} name="github" className="authBtn">
          깃허브로 로그인 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
