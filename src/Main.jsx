import React from "react";
import App from "./App";
import { isLoggedIn } from "./data/Auth";
import Login from "./components/Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import ErrorPage from "./common/ErrorPage";
import Logout from "./components/Logout";

const Main = () => {
  const navigate = useNavigate();
  const onIndex = () => {
    return isLoggedIn() ? (
      <Navigate to="/home/books" />
    ) : (
      <Navigate to="/login" />
    );
  };
  const onLogin = () => {
    return isLoggedIn() ? <Navigate to="/home/books" /> : <Login />;
  };

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="/" element={onIndex()} />
          <Route
            path="/home/*"
            element={isLoggedIn() ? <App /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={onLogin()} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Main;
