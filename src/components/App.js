import { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../Myfirebase";

function App() {
  const [init, setinit] = useState(false);
  const [islogedin, setislogedin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setislogedin(true);
      } else {
        setislogedin(false);
      }
      setinit(true);
    });
  }, []);
  return (
    <div className="App">
      {init ? <Router islogedin={islogedin} /> : "loading..."}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </div>
  );
}

export default App;
