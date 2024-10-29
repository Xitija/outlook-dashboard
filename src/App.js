import Pagination from "./components/Pagination";
import logo from "./logo.svg";
import EmailslList from "./pages/EmailList/EmailList";
// import "./App.css";

function App() {
  return (
    <div className="mx-10 mb-5">
      <EmailslList page={1} />
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
