export default function Email(email) {
  const date = new Date(email.date);
  const displayDate = date.toLocaleString().split(",")[0];
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const getFromCharacter = (name) => {
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <div
      key={email.id}
      className="mt-4 p-4 border rounded-lg"
      style={{ borderColor: "#cfd2dc" }}
    >
      <div className="flex items-start">
        <div
          className="w-10 h-10 rounded-full mr-3 flex items-center justify-center font-medium"
          style={{ backgroundColor: "#e54065", color: "white" }}
        >
          {getFromCharacter(email?.from?.name)}
        </div>
        <div>
          <div className="flex flex-col text-sm" style={{ color: "#636363" }}>
            <span className="font-normal">
              From:{" "}
              <span className="font-semibold">
                {email?.from?.name} {"<" + email?.from?.email + ">"}{" "}
              </span>
            </span>
            <span>
              Subject: <span className="font-semibold">{email.subject}</span>
            </span>
            <span className="my-2">{email.short_description}</span>
            <div className="flex justify-between max-w-52 text-xs">
              <span>
                {displayDate} {time.toLowerCase()}
              </span>
              <span className="font-semibold" style={{ color: "#e54065" }}>
                Favourite
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
