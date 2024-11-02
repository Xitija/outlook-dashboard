import { useEffect } from "react";
import { useEmails } from "../../context/EmailListContext";
import Email from "../../components/Email";
import { MESSAGES } from "../../constants";

export default function EmailslList() {
  const { currentPage, emailPages, getFilteredList, getEmailList, filterBy } =
    useEmails();

  useEffect(() => {
    getEmailList(currentPage);
  }, [currentPage]);

  let filteredList = [];

  // console.log(page, emailPages, "pppp");
  if (currentPage === 1) {
    filteredList = getFilteredList().slice(0, 10);
  } else if (currentPage === 2) {
    filteredList = getFilteredList().slice(10, 10 * 2);
  }

  return (
    <div className="w-full">
      {filteredList?.map((email) => (
        <Email key={email.id + "email"} {...email} />
      ))}
      <div className="text-sm italic">
        {!filteredList.length && filterBy === "unread" && (
          <p className="my-4">{MESSAGES.NO_UNREAD_MAILS}</p>
        )}
        {!filteredList.length && filterBy === "favorite" && (
          <p className="my-4">{MESSAGES.NO_FAVORITE_MAILS}</p>
        )}
        {!filteredList.length && filterBy === "read" && (
          <p className="my-4">{MESSAGES.LOADING}</p>
        )}
      </div>
    </div>
  );
}
