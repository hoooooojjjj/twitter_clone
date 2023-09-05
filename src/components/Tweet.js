import React, { useState } from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../Myfirebase";
import { storage } from "../Myfirebase";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
const Tweet = ({ id, tweet, isOwner, createAt, creatorId, file, userName }) => {
  const [editing, setediting] = useState(tweet);
  const [isEdit, setisEdit] = useState(false);

  // 데이터 삭제(delete)
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 트윗을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, "tweets", id));
      // // 참조에 이미지 url을 넣어주면 그 이미지 파일 참조를 가져옴
      // const storageRef = ref(storage, file);
      // console.log(file);
      // // 파일 삭제
      // await deleteObject(storageRef);
    }
  };

  const onEditClick = () => {
    setisEdit(true);
  };

  const toggleEditing = () => setisEdit((prev) => !prev);
  const onEdit = async () => {
    await setDoc(doc(db, "tweets", id), {
      tweet: editing,
      createAt,
      creatorId,
    });
    setisEdit(false);
  };
  return (
    <div className="nweet">
      {isEdit ? (
        <>
          <div className="container nweetEdit">
            <input
              type="text"
              required
              value={editing}
              autoFocus
              className="formInput"
              onChange={(e) => {
                setediting(e.target.value);
              }}
            />
            <button onClick={onEdit} className="formBtn">
              수정하기
            </button>
          </div>
          <button
            className="formBtn cancelBtn"
            onClick={() => {
              setisEdit(false);
            }}
          >
            취소하기
          </button>
        </>
      ) : (
        <div>
          <h4>
            <div className="username">{userName}</div>
            <span>{tweet}</span>
          </h4>
          {file && <img src={file}></img>}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onEditClick}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(Tweet);
