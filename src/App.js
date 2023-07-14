import React from "react";
import { GlobalStyled } from "./GlobalStyled";
import { Route, Routes } from "react-router-dom";
import Header from "./compononts/Header";
import Home from "./pages/Home";
import Post from "./pages/Post"
import PostWrite from "./pages/PostWrite"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import ErrorBoundery from "./pages/ErrorBoundery"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <GlobalStyled />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="post" element={<Post />} />
          <Route path="postWrite" element={<PostWrite />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<Admin />} />
          <Route path="errorboundery" element={<ErrorBoundery />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
