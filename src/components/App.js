import { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../Myfirebase";

function App() {
  const [init, setinit] = useState(false);
  const [islogedin, setislogedin] = useState(false);
  const [userObj, setuserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      // 계속 사용자가 로그인 했는지 실시간으로 확인
      if (user) {
        // 로그인 되어 있으면
        setislogedin(true);
        setuserObj(user); // user는 사용자의 정보
      } else {
        setislogedin(false);
      }
      setinit(true);
    });
  }, []);
  return (
    <div className="App">
      {init ? <Router islogedin={islogedin} userObj={userObj} /> : "loading..."}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </div>
  );
}

export default App;
