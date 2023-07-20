import React from "react";
import * as Pages from "./pages";
import { Header } from "./compononts";
import { GlobalStyled } from "./GlobalStyled";
import { Route, Routes } from "react-router-dom";
import ProtectivePages from "./pages/ProtectivePages";

function App() {
  return (
    <>
      <GlobalStyled />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Pages.Home />} />
          <Route path="login" element={<Pages.Login />} />
          <Route element={<ProtectivePages/>}>
            <Route path="post" element={<Pages.Post />} />
          </Route>
          <Route path="register" element={<Pages.Register />} />
          <Route path="admin" element={<Pages.Admin />} />
          <Route path="errorboundery" element={<Pages.ErrorBoundery />} />
          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
