import { useEffect } from "react";
import { createContext, useState } from "react";

export const EmailList = createContext();

export const EmailListProvider = ({ children }) => {
  const apiUrl = `https://flipkart-email-mock.now.sh/?page=1`;
  const [loader, setLoader] = useState(false);
  const [emailPages, setEmailPages] = useState({
    page1: {},
    page2: {},
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
          page1: { ...result, list: mapRead(result.list) },
        });
      } else if (page === 2) {
        setEmailPages({ ...emailPages, page2: result });
      }

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

  const value = { loader, getEmailList, emailPages };

  return <EmailList.Provider value={value}>{children}</EmailList.Provider>;
};
