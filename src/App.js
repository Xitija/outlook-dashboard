import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Filters from "./components/Filters";
import { EmailView } from "./pages/EmailList/EmailView";
import { GraphViewer } from "./pages/GraphViewer/GraphViewer";
import TimeTrend from "./pages/TimeTrend/TimeTrend";
import { Login } from "./pages/Login";
import { RequiresAuth } from "./components/RequiresAuth";

function App() {
  const location = useLocation();

  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "#e54065" : "#636363",
  });

  return (
    <div className={location.pathname === "/login" ? "" : "mx-10 mb-5"}>
      <div className="flex max-w-full justify-between items-center">
        {location.pathname === "/" && (
          <>
            <Filters />
            <NavLink to="/reports" style={getActiveStyle}>
              <span className="underline underline-offset-4">Graph</span>
            </NavLink>
          </>
        )}
        {location.pathname.includes("/reports") && (
          <NavLink to="/" style={getActiveStyle}>
            <span className="underline underline-offset-4">Emails</span>
          </NavLink>
        )}
      </div>

      <Routes>
        <Route path="/" element={<EmailView />} />
        <Route
          path="/reports/:start?/:end?/:age?/:gender?"
          element={
            <RequiresAuth>
              <GraphViewer />
            </RequiresAuth>
          }
        />
        <Route path="/timetrend/:category" element={<TimeTrend />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
