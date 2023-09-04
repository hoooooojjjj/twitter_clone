// 파이어베이스를 사용할 때마다 key와 함수들을 가져와야하니까 가져다 쓸 수 있게 따로 파일을 만들어둔다.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGESENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};



// 파이어베이스 초기화를 해두고
const app = initializeApp(firebaseConfig);

// 각 기능을 사용할 떄마다 export해준다.
export const auth = getAuth(app); // 인증
export const db = getFirestore(app); // firestore
export const storage = getStorage(app);
