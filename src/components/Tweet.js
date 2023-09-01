import React, { useState } from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../Myfirebase";
const Tweet = ({ id, tweet, isOwner, createAt, creatorId }) => {
  const [editing, setediting] = useState(tweet);
  const [isEdit, setisEdit] = useState(false);

  // 데이터 삭제(delete)
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 트윗을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, "tweets", id));
    }
  };

  const onEditClick = () => {
    setisEdit(true);
  };

  const onEdit = async () => {
    await setDoc(doc(db, "tweets", id), {
      tweet: editing,
      createAt,
      creatorId,
    });
    setisEdit(false);
  };
  return (
    <div>
      {isEdit ? (
        <div>
          <input
            type="text"
            required
            value={editing}
            onChange={(e) => {
              setediting(e.target.value);
            }}
          />
          <button onClick={onEdit}>수정하기</button>
          <button
            onClick={() => {
              setisEdit(false);
            }}
          >
            취소하기
          </button>
        </div>
      ) : (
        <div>
          <h4>{tweet}</h4>
          {isOwner ? (
            <>
              <button onClick={onDeleteClick}>트윗 삭제</button>
              <button onClick={onEditClick}>트윗 수정</button>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(Tweet);
