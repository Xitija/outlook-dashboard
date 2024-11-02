import { useContext, createContext, useState } from "react";

export const EmailList = createContext();

export const EmailListProvider = ({ children }) => {
  const apiUrl = `https://flipkart-email-mock.now.sh/?page=`;
  const emailUrl = `https://flipkart-email-mock.now.sh/?id=`;
  // const [loader, setLoader] = useState(false);
  const [filterBy, setFilterBy] = useState("read");
  const [viewMail, setViewMail] = useState(false);
  const [emailDetail, setEmailDetail] = useState();
  const [emailPages, setEmailPages] = useState({
    list: [],
    totalEmails: 0,
  });
  const [pages, setPages] = useState(0);
  const [fetchedPages, setFetchedPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;

  const getEmailList = async (page) => {
    try {
      // setLoader(false);
      if (!fetchedPages.includes(page)) {
        const response = await fetch(apiUrl + page);
        const result = await response.json();
        setEmailPages({
          ...emailPages,
          list: [...emailPages.list, ...mapRead(result.list)],
          totalEmails: result.total,
        });
        setFetchedPages([...fetchedPages, parseInt(page)]);
        setPages(Math.ceil(result.total / emailsPerPage));
      } else {
        // setEmailPages({ ...emailPages, page2: result });
      }

      // return result;
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const toggleFavorite = (id) => {
    const foundEmail = emailPages.list.find((email) => email.id === id);

    const emailList = emailPages.list.map((email) =>
      email.id === id ? { ...email, favorite: !email.favorite } : { ...email }
    );

    setEmailPages({
      ...emailPages,
      list: emailList,
      total: emailPages.total,
    });
    setEmailDetail({ ...foundEmail, favorite: !foundEmail.favorite });
  };

  const getFilteredList = () => {
    try {
      return emailPages.list.filter((item) => {
        switch (filterBy) {
          // case "read":
          //   return item.read === true;
          case "unread":
            return item.read === false;
          case "favorite":
            return item.favorite === true;
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const response = await fetch(emailUrl + email?.id);
      const result = await response.json();
      // setLoader(false);
      setEmailDetail({ ...email, ...result });
      const emailList = emailPages.list.map((item) => {
        return email.id === item.id
          ? { ...email, ...result, read: true }
          : item;
      });

      setEmailPages({
        ...emailPages,
        list: emailList,
        total: emailPages.total,
      });

      // return result;
    } catch (err) {
      console.log(err, "errr");
    }
  };

  const mapRead = (mails) =>
    mails.map((mail) => ({ ...mail, read: false, favorite: false }));

  // useEffect(() => {
  //   setLoader(true);
  // }, []);

  const value = {
    getEmailList,
    getFilteredList,
    emailPages,
    filterBy,
    setFilterBy,
    viewMail,
    setViewMail,
    viewEmailDetail,
    emailDetail,
    toggleFavorite,
    pages,
    currentPage,
    setCurrentPage,
  };

  return <EmailList.Provider value={value}>{children}</EmailList.Provider>;
};

export const useEmails = () => useContext(EmailList);
