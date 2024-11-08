import { useEmails } from "../context/EmailListContext";

export default function Filters() {
  const { filterBy, setFilterBy, setViewMail } = useEmails();
  const filters = ["Unread", "Read", "Favorite"];

  return (
    <div className="flex text-sm justify-between min-w-64 max-w-72 mt-4">
      Filter By:
      {filters.map((filter) => {
        const selectedFilter = filterBy === filter.toLowerCase();
        return (
          <span
            className={selectedFilter ? "px-3 border rounded-full" : ""}
            style={
              selectedFilter
                ? { backgroundColor: "#e1e4ea", borderColor: "#cfd2dc" }
                : {}
            }
            onClick={() => {
              setViewMail(false);
              setFilterBy(filter.toLowerCase());
            }}
            key={filter}
            role="button"
          >
            {filter}
          </span>
        );
      })}
    </div>
  );
}
