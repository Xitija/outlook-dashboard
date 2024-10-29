import React from "react";
import ReactDOM from "react-dom/client";
// import './assets/main.css';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EmailListProvider } from "./context/EmailListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EmailListProvider>
      <App />
    </EmailListProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
