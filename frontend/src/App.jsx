import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { ForgotPassword } from "./pages/forgotPassword.jsx";
import useGetCurrentUser from "./hooks/useGetCurrentUser.jsx";
export const serverUrl = "http://localhost:8000";
const App = () => {
  useGetCurrentUser()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
