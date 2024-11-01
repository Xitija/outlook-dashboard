import { useEffect } from "react";
import { useEmails } from "../../context/EmailListContext";
import Email from "../../components/Email";

export default function EmailslList({ page }) {
  const { emailPages, getFilteredList, getEmailList } = useEmails();

  useEffect(() => {
    getEmailList(page);
  }, [page]);

  let emails = [];

  console.log(page, emailPages, "pppp");
  if (page === 1) {
    console.log(page, "pagee");
    emails = emailPages.list;
  } else if (page === 2) {
    emails = emailPages.list;
  }

  return (
    <div>
      {
         getFilteredList()?.map((email) => (
          <Email key={email.id} {...email} />
        ))
        //    emails?.map(({id, from, date, subject, short_description}) =>
        //     <div key={id}>
        //         <p>{date}</p>
        //         <p>{subject}</p>
        //         <p>{short_description}</p>
        //     </div>)
      }
    </div>
  );
}
