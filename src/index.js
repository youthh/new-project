import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
