import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Routes/Home";
import Auth from "../Routes/Auth";
import Navigation from "./Navigation";
import Profile from "../Routes/Profile";

const Router = ({ islogedin, userObj, refreshUser }) => {
  return (
    <BrowserRouter>
      {islogedin ? <Navigation userObj={userObj} /> : <></>}
      <Routes>
        {islogedin ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
