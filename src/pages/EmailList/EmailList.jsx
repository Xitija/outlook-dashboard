import { useEffect } from "react";
import { useEmails } from "../../context/EmailListContext";
import Email from "../../components/Email";
import { MESSAGES } from "../../constants";

export default function EmailslList({ page }) {
  const { emailPages, getFilteredList, getEmailList, filterBy } = useEmails();

  useEffect(() => {
    getEmailList(page);
  }, [page]);

  let emails = [];

  //   console.log(page, emailPages, "pppp");
  if (page === 1) {
    // console.log(page, "pagee");
    emails = emailPages.list;
  } else if (page === 2) {
    emails = emailPages.list;
  }

  const filteredList = getFilteredList();

  return (
    <div className="w-full">
      {filteredList?.map((email) => (
        <Email key={email.id + "email"} {...email} />
      ))}
      {!filteredList.length && filterBy === "unread" && (
        <p className="my-4">{MESSAGES.NO_UNREAD_MAILS}</p>
      )}
      {!filteredList.length && filterBy === "favorite" && (
        <p className="my-4">{MESSAGES.NO_FAVORITE_MAILS}</p>
      )}
    </div>
  );
}
