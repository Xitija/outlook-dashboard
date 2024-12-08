import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Filters from "./components/Filters";
import { EmailView } from "./pages/EmailList/EmailView";
import { GraphViewer } from "./pages/GraphViewer/GraphViewer";
import TimeTrend from "./pages/TimeTrend/TimeTrend";

function App() {
  const location = useLocation();
  console.log(location.pathname);

  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "#e54065" : "#636363",
  });

  return (
    <div className="mx-10 mb-5">
      <div className="flex max-w-full justify-between items-center">
        {location.pathname === "/" && (
          <>
            <Filters />
            <NavLink to="/reports" style={getActiveStyle}>
              <span className="underline underline-offset-4">Graph</span>
            </NavLink>
          </>
        )}
        {location.pathname === "/reports" && (
          <NavLink to="/" style={getActiveStyle}>
            <span className="underline underline-offset-4">Emails</span>
          </NavLink>
        )}
      </div>

      <Routes>
        <Route path="/" element={<EmailView />} />
        <Route path="/reports" element={<GraphViewer />} />
        <Route path="/timetrend/:category" element={<TimeTrend />} />
      </Routes>
    </div>
  );
}

export default App;
