import { useEmails } from "../context/EmailListContext";
import { getDisplayDate, getFromCharacter, getHTML } from "../utils";
export default function EmailDetails() {
  const { emailDetail } = useEmails();
  console.log(emailDetail, "jjjjjjjjjjjjjjjjjjjjj");

  const nodes = getHTML(emailDetail?.body);

  const handleFavourite = (emailId) => {
    console.log(emailId);
  };

  return (
    emailDetail && (
      <div
        className="mt-4 ml-4 p-4 border rounded-lg"
        style={{
          borderColor: "#cfd2dc",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="flex items-start">
          <div
            className="w-10 h-10 rounded-full mr-3 flex items-center justify-center font-medium shrink-0"
            style={{ backgroundColor: "#e54065", color: "white" }}
          >
            {getFromCharacter(emailDetail?.from?.name)}
          </div>
          <div className="mx-4" style={{ color: "#636363" }}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xl font-medium">
                  {emailDetail.subject}
                </span>
                <span className="text-sm my-2">
                  {getDisplayDate(emailDetail?.date)}
                </span>
              </div>
              <button
                className="border rounded-full px-3 py-1 text-xs"
                style={{
                  backgroundColor: "#e54065",
                  color: "white",
                  borderColor: "#e54065",
                }}
                onClick={() => handleFavourite(emailDetail?.id)}
              >
                Mark as favorite
              </button>
            </div>
            <div className="text-sm">{nodes}</div>
          </div>
        </div>
      </div>
    )
  );
}