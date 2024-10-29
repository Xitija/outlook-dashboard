import { useEffect, useContext } from "react";
import { EmailList } from "../../context/EmailListContext";
import Email from "../../components/Email";


export default function EmailslList({ page }) {

    const useEmails = () => useContext(EmailList);
    const {emailPages, getEmailList} = useEmails();

    useEffect(() => {
        getEmailList(page)
    },[page])

    let emails = [];

    console.log(page, emailPages, "pppp")
    if(page === 1) {
        console.log(page,"pagee")
        emails = emailPages.page1.list;
    } else if( page === 2) {
        emails = emailPages.page2.list;
    }

    return (
        <div>
            {
                emails?.map((email) => <Email key={email.id} {...email}/>)
            //    emails?.map(({id, from, date, subject, short_description}) => 
            //     <div key={id}>
            //         <p>{date}</p>
            //         <p>{subject}</p>
            //         <p>{short_description}</p>
            //     </div>)
            }
        </div>
    )
}