import { useEmails } from "../context/EmailListContext";
import { getFromCharacter } from "../utils";

export default function Email(email) {
  const { viewMail, setViewMail, viewEmailDetail, emailDetail } = useEmails();
  const date = new Date(email.date);
  const displayDate = date.toLocaleString().split(",")[0];
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleEmailClick = () => {
    console.log(emailDetail?.id, email?.id, "match");
    setViewMail(emailDetail?.id === email?.id ? !viewMail : true);
    viewEmailDetail(email);
  };

  return (
    <div
      className="mt-4 p-4 border rounded-lg"
      style={{
        borderColor: emailDetail?.id === email?.id ? "#e54065" : "#cfd2dc",
        backgroundColor: email.read ? "#f2f2f2" : "#ffffff",
      }}
      onClick={handleEmailClick}
      role="button"
    >
      <div className="flex items-start w-full">
        <div
          className="w-10 h-10 rounded-full mr-3 flex items-center justify-center font-medium shrink-0"
          style={{ backgroundColor: "#e54065", color: "white" }}
        >
          {getFromCharacter(email?.from?.name)}
        </div>
        <div>
          <div
            className="flex flex-col text-sm w-full"
            style={{ color: "#636363" }}
          >
            <span className="font-normal">
              From:{" "}
              <span className="font-semibold">
                {email?.from?.name} {"<" + email?.from?.email + ">"}{" "}
              </span>
            </span>
            <span>
              Subject: <span className="font-semibold">{email.subject}</span>
            </span>
            <span
              style={{ width: viewMail === true ? "24rem" : "auto" }}
              className="my-2 truncate text-ellipsis overflow-hidden"
            >
              {email.short_description}
            </span>
            <div className="flex justify-between max-w-52 text-xs">
              <span>
                {displayDate} {time.toLowerCase()}
              </span>
              {email.favorite && (
                <span
                  className="font-semibold"
                  style={{ color: "#e54065" }}
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Favourite
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
