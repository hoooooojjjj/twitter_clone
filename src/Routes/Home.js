import React, { useEffect, useState } from "react";
import { db } from "../Myfirebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";
const Home = ({ userObj }) => {
  const [tweetList, settweetList] = useState([]);

  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = "게시글 홈";
  });

  useEffect(() => {
    // 정렬 기준 필드와 정렬 순서를 지정하여 쿼리 생성
    const q = query(collection(db, "tweets"), orderBy("createAt", "desc"));

    // 실시간으로 데이터 가져오기(realtime response)
    const unsub = onSnapshot(q, (doc) => {
      // 문서 ID를 함께 배열에 저장해서 나중에 어떤 문서인지 찾을 수 있도록 함.
      const tweetArray = doc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      settweetList(tweetArray);
    });
  }, []);

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweetList.map((it) => (
          <Tweet key={it.id} {...it} isOwner={userObj.uid === it.creatorId} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home);
