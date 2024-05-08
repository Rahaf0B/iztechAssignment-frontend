import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import CheckOptCode from "./pages/CheckOptCode";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<SignUp></SignUp>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route
            path="/forgetPassword"
            element={<ForgetPassword></ForgetPassword>}
          ></Route>
          <Route
            path="/checkOptCode"
            element={<CheckOptCode></CheckOptCode>}
          ></Route>

          <Route
            path="/changePassword"
            element={<ChangePassword></ChangePassword>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
