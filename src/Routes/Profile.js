import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Myfirebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nav = useNavigate();
  const onLogoutClick = () => {
    signOut(auth)
      .then(() => {
        nav("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={onLogoutClick}>로그아웃</button>
    </div>
  );
};

export default Profile;
