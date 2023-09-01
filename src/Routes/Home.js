import React, { useEffect, useState } from "react";
import { db } from "../Myfirebase";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import Tweet from "../components/Tweet";
const Home = ({ userObj }) => {
  const [tweet, settweet] = useState("");
  const [tweetList, settweetList] = useState([]);

  // 데이터 추가하기(create)
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "tweets"), {
        tweet: tweet,
        createAt: Date.now(),
        creatorId: userObj.uid, // 유저의 토큰을 저장해서 어떤 유저인지 알 수 있도록 함
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    settweet("");
  };
  // 기존 데이터만 가져오기(response)
  // const getTweet = async () => {
  //   const querySnapshot = await getDocs(collection(db, "tweets"));
  //   querySnapshot.forEach((doc) => {
  //     const newitem = {
  //       data: doc.data(),
  //       id: doc.id,
  //     };
  //     settweetList((prev) => [newitem, ...prev]);
  //   });
  // };

  useEffect(() => {
    // 실시간으로 데이터 가져오기(realtime response)
    const unsub = onSnapshot(collection(db, "tweets"), (doc) => {
      // 문서 ID를 함께 배열에 저장해서 나중에 어떤 문서인지 찾을 수 있도록 함.
      const tweetArray = doc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      settweetList(tweetArray);
    });
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={(e) => {
            settweet(e.target.value);
          }}
          placeholder="기분이 어떤가요?"
          maxLength={120}
        />
        <input type="submit" value="트윗" />
      </form>
      <div>
        {tweetList.map((it) => (
          <Tweet key={it.id} {...it} isOwner={userObj.uid === it.creatorId} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home);
