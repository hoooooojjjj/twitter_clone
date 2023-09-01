import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Routes/Home";
import Auth from "../Routes/Auth";
import Navigation from "./Navigation";
import Profile from "../Routes/Profile";

const Router = ({ islogedin }) => {
  return (
    <BrowserRouter>
      {islogedin ? <Navigation /> : <></>}
      <Routes>
        {islogedin ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
