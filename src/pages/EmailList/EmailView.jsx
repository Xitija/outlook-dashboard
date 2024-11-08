import Pagination from "../../components/Pagination";
import EmailslList from "./EmailList";
import { useEmails } from "../../context/EmailListContext";
import EmailDetails from "../../components/EmailDetails";

export const EmailView = () => {
  const { viewMail } = useEmails();
  return (
    <>
      <div className="flex">
        <EmailslList />
        {viewMail ? <EmailDetails /> : null}
      </div>
      <Pagination />
    </>
  );
};
