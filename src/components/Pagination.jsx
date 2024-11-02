import { useEmails } from "../context/EmailListContext";

export default function Pagination() {
  const { pages, currentPage, setCurrentPage } = useEmails();

  return (
    <ol className="flex justify-center text-xs font-medium space-x-1 my-4">
      {pages &&
        Array.from({ length: pages }, (v, i) => (
          <li
            key={i + 1 + "page-no"}
            className="block w-8 h-8 text-center text-white border rounded leading-8"
            role="button"
            onClick={() => setCurrentPage(i + 1)}
            style={
              i + 1 === currentPage
                ? { backgroundColor: "#e54065" }
                : {
                    borderColor: "#e54065",
                    color: "#e54065",
                  }
            }
          >
            {i + 1}
          </li>
        ))}
    </ol>
  );
}
