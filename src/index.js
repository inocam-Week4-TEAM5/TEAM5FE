import "./index.css";
import App from "./App";
import React from "react";
import { theme } from "./theme";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { inobaoQuery, store } from "./redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ApiProvider api={inobaoQuery}>
        <App />
        </ApiProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

reportWebVitals();
