// import Pagination from "./components/Pagination";
import EmailslList from "./pages/EmailList/EmailList";
import Filters from "./components/Filters";
import { useEmails } from "./context/EmailListContext";
import EmailDetails from "./components/EmailDetails";

function App() {
  const { viewMail } = useEmails();
  return (
    <div className="mx-10 mb-5">
      <Filters />
      <div className="flex">
        <EmailslList page={1} />
        {viewMail ? <EmailDetails /> : null}
      </div>
    </div>
  );
}

export default App;
