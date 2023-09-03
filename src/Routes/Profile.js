import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Myfirebase";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const nav = useNavigate();
  const onLogoutClick = async () => {
    await signOut(auth);
    nav("/", { replace: true });
  };

  return (
    <div>
      <button onClick={onLogoutClick}>로그아웃</button>
    </div>
  );
};

export default Profile;
