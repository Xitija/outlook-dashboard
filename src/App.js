import Pagination from "./components/Pagination";
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
        <EmailslList />
        {viewMail ? <EmailDetails /> : null}
      </div>
      <Pagination />
    </div>
  );
}

export default App;
