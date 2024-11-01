import Pagination from "./components/Pagination";
import logo from "./logo.svg";
import EmailslList from "./pages/EmailList/EmailList";
import Filters from "./components/Filters";
import SplitPane from "react-split-pane";
import { useState } from "react";
import { useEmails } from "./context/EmailListContext";
import EmailDetails from "./components/EmailDetails";
// import "./App.css";

function App() {
  const { viewMail } = useEmails();
  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  console.log(viewMail, "viewmail");
  return (
    <div className="mx-10 mb-5">
      <Filters />
      <SplitPane
        split="vertical"
        minSize="50%"
        defaultSize={viewMail ? "40%" : "100%"}
        style={{ position: "relative" }}
      >
        <EmailslList page={1} />
        {/* <div style={{ ...layoutCSS, background: "#d5d7d9" }}>pane2</div> */}
        {/* <div>pane1</div> */}
        {viewMail ? <EmailDetails /> : null}
      </SplitPane>
      {/* <Pagination /> */}
      {/* <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div className="shrink-0">
          <img className="size-12" src={logo} alt="react"/>
        </div>
        <div>
          <div className="text-xl font-medium text-black">Tailwind</div>
          <p className="text-slate-500">Tailwind with React!!</p>
        </div>
      </div> */}
    </div>
  );
}

export default App;
