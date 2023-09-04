import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Myfirebase";
import { useNavigate } from "react-router-dom";
import { db } from "../Myfirebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const nav = useNavigate();
  const [newDisplayName, setnewDisplayName] = useState(userObj.displayName);

  const onNameChange = (e) => {
    setnewDisplayName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  };
  const onLogoutClick = async () => {
    await signOut(auth);
    nav("/", { replace: true });
  };

  const getMyTweets = async () => {
    const q = query(
      collection(db, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createAt", "desc")
    );
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
  };

  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          value={newDisplayName}
          autoFocus
          onChange={onNameChange}
          placeholder="이름"
          className="formInput"
        />
        <input
          type="submit"
          value="프로필 업데이트"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        로그아웃
      </button>
    </div>
  );
};

export default Profile;
