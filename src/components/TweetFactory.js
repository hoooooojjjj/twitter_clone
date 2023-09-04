import React, { useState } from "react";
import { storage } from "../Myfirebase";
import { db } from "../Myfirebase";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const TweetFactory = ({ userObj }) => {
  const [tweet, settweet] = useState("");
  const [attachment, setattachment] = useState();

  // 데이터 추가하기(create)
  const onSubmit = async (e) => {
    e.preventDefault();

    let downloadUrl = "";
    if (attachment) {
      // 버킷 파일 참조 만들기(-> 폴더로 만들 수 있다. 폴더이름/파일이름 으로 각 폴더로 만들 수 있다.)
      const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);

      // 파일 업로드
      // const fileUpload = await uploadString(fileRef, attachment);

      // //파일 다운로드
      // downloadUrl = await getDownloadURL(
      //   ref(storage, `${userObj.uid}/${fileUpload.ref.name}`)
      // );
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      //storage에 있는 파일 URL로 다운로드 받기
      downloadUrl = await getDownloadURL(uploadFile.ref);
    }

    try {
      const docRef = await addDoc(collection(db, "tweets"), {
        tweet: tweet,
        createAt: Date.now(),
        creatorId: userObj.uid, // 유저의 토큰을 저장해서 어떤 유저인지 알 수 있도록 함
        file: downloadUrl,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    settweet("");
    setattachment(null);
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

  const onFileChange = (e) => {
    // input에서 추가된 파일을 가져옴
    const files = e.target.files;
    const theFile = files[0];

    // FileReader클래스를 가져옴 -> 사용자가 업로드한 이미지를 img 태그에 src로 렌더링할 수 있음
    const reader = new FileReader();
    // 파일을 가져올 수 있음(read)
    reader.readAsDataURL(theFile);
    // 파일 로드(read)가 끝날 때까지 listen하는 이벤트 리스너 사용
    reader.onloadend = (finishedEvent) => {
      // 파일 로드(read)가 끝나면 실행
      // -> currentTarget.result로 파일을 텍스트로 변환해준 것을 얻을 수 있음
      setattachment(finishedEvent.currentTarget.result);
    };
  };

  const onClearAttachment = () => {
    setattachment(null);
  };
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="트윗" />
        {attachment && (
          <div>
            <img src={attachment} width={"50px"} height={"50px"} alt=""></img>
            <button onClick={onClearAttachment}>사진 제거</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TweetFactory;
