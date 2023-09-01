import { auth } from "../Myfirebase";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [newAccount, setnewAccount] = useState(true);
  const [err, seterr] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setemail(value);
    } else if (name === "password") {
      setpassword(value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (newAccount) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          seterr(error.message);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const toggleAccount = () => {
    setnewAccount(!newAccount);
  };

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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="이메일"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
          required
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
        {err}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</span>
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
