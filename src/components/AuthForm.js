import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Myfirebase";

const AuthForm = () => {
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
        .then((userCredential) => {})
        .catch((error) => {
          seterr(error.message);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {})
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const toggleAccount = () => {
    setnewAccount(!newAccount);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="container">
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="이메일"
          required
          className="authInput"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
          required
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "회원가입" : "로그인"}
          className="authInput authSubmit"
        />
        {err && <span className="authError">{err}</span>}
      </form>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
          marginTop: 10,
        }}
        onClick={toggleAccount}
      >
        {newAccount ? "로그인하러가기" : "회원가입하러가기"}
      </span>
    </div>
  );
};

export default AuthForm;
