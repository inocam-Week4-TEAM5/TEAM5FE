import React from "react";
import * as Pages from "./pages";
import { Header } from "./compononts";
import { GlobalStyled } from "./GlobalStyled";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyled />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Pages.Home />} />
          <Route path="post" element={<Pages.Post />} />
          <Route path="login" element={<Pages.Login />} />
          <Route path="register" element={<Pages.Register />} />
          <Route path="admin" element={<Pages.Admin />} />
          <Route path="errorboundery" element={<Pages.ErrorBoundery />} />
        </Route>
        <Route path="*" element={<Pages.NotFound />} />
      </Routes>
    </>
  );
}

export default App;
