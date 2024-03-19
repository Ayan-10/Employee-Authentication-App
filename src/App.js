import React from "react";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import UpdateDash from "./Components/Profile/UpdateProfile";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./Components/Dashboard/DashBoard";


function App() {
  return (
    <div className="App" style={{background: "#CFFFF6"}}>
      {/* <SignUp/> */}
      {/* <Login/> */}
      {/* <Profile/> */}
      {/* <UpdateDash/> */}
      {/* <ForgetPassword/> */}
      <Routes>
      {/* client Side */}
      <Route path="/profile" element={<Profile />}/>
      <Route path="login" element={<Login/> } />
      <Route path="signup" element={<SignUp/>} />
      <Route path="reset" element={<ForgetPassword/> } />
      <Route path="update" element={<UpdateDash/>  } />
      <Route path="/dashboard" element={<DashBoard />}/>
    </Routes>
    </div>
  );
}

export default App;
