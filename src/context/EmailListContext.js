import { useEffect, useContext, createContext, useState } from "react";

export const EmailList = createContext();

export const EmailListProvider = ({ children }) => {
  const apiUrl = `https://flipkart-email-mock.now.sh/?page=1`;
  const [loader, setLoader] = useState(false);
  const [filterBy, setFilterBy] = useState("read");
  const [viewMail, setViewMail] = useState(false);
  const [emailDetail, setEmailDetail] = useState();
  const [emailPages, setEmailPages] = useState({
    list: [],
    total: 0,
  });

  const getEmailList = async (page) => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      console.log(result, "result");
      setLoader(false);
      if (page === 1) {
        setEmailPages({
          ...emailPages,
          list: [...emailPages.list, ...mapRead(result.list)],
          total: result.total,
        });
      } else if (page === 2) {
        setEmailPages({ ...emailPages, page2: result });
      }

      // return result;
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const getFilteredList = () => {
    try {
      console.log(emailPages, "dhwhwheiquwi");
      return emailPages.list.filter((item) => {
        switch (filterBy) {
          // case "read":
          //   return item.read === true;
          case "unread":
            return item.read === false;
          default:
            return item;
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const viewEmailDetail = async (email) => {
    try {
      const response = await fetch(
        "https://flipkart-email-mock.now.sh/?id=" + email?.id
      );
      const result = await response.json();
      console.log(result, "result");
      // setLoader(false);
      setEmailDetail({ ...email, ...result });

      // return result;
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const mapRead = (mails) =>
    mails.map((mail) => ({ ...mail, read: false, favorite: false }));

  useEffect(() => {
    setLoader(true);
  }, []);

  const value = {
    loader,
    getEmailList,
    getFilteredList,
    emailPages,
    filterBy,
    setFilterBy,
    viewMail,
    setViewMail,
    viewEmailDetail,
    emailDetail,
  };

  return <EmailList.Provider value={value}>{children}</EmailList.Provider>;
};

export const useEmails = () => useContext(EmailList);
