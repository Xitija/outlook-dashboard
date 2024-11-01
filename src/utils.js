export const getFromCharacter = (name) => {
  return name.trim().charAt(0).toUpperCase();
};

export const getDisplayDate = (timestamp) => {
  const date = new Date(timestamp);
  const displayDate = date?.toLocaleString().split(",")[0];
  const time = date?.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${displayDate}  ${time.toLowerCase()}`;
};

export const getHTML = (docString) => {
  const doc = new DOMParser().parseFromString(docString, "application/xml");

  if (doc?.childNodes[0]?.childNodes) {
    const html = doc.childNodes[0].childNodes;
    const elements = Object.keys(html).map((key, i) => {
      let element = html[key];
      return <p className="my-2" key={i + "-th-el"}>{element.innerHTML}</p>;
    });

    return elements;
  }

  return [];
};
