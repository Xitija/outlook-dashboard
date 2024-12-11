import { useState } from "react";
import DatePicker from "react-datepicker";
import { useData } from "../context/AnalyticsDataContext";

export default function GraphFilters({
  onAgeSelect,
  onGenderSelect,
  onChange,
}) {
  const { filters, clearPreferences } = useData();

  const [startDate, setStartDate] = useState(filters.startDate);
  const [endDate, setEndDate] = useState(filters.endDate);
  const [age, setAge] = useState(filters?.age);
  const [gender, setGender] = useState(filters?.gender);

  const minDate = new Date("2022-10-04");
  const maxDate = new Date("2022-10-30");

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange(dates);
  };

  const onAgeChange = (e) => {
    setAge(e.target.value);
    onAgeSelect(e);
  };

  const onGenderChange = (e) => {
    setGender(e.target.value);
    onGenderSelect(e);
  };

  const clearFilters = () => {
    setAge(null);
    setGender(null);
    setStartDate(minDate);
    setEndDate(minDate);
    clearPreferences(Object.keys(filters));
  };

  return (
    <div className="flex flex-col justify-around">
      <div className="">
        <DatePicker
          selected={startDate}
          onChange={onDateChange}
          minDate={minDate}
          maxDate={maxDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          showDisabledMonthNavigation
        />
        <div className="m-2">
          <p>Age</p>
          <div>
            <input
              name="age"
              type="radio"
              id="15-25"
              value="15-25"
              onChange={(e) => onAgeChange(e)}
              checked={"15-25" === age}
            ></input>
            <label htmlFor="15-25" className="mx-2">
              15-25
            </label>
          </div>
          <div>
            <input
              name="age"
              type="radio"
              id=">25"
              value={">25"}
              onChange={(e) => onAgeChange(e)}
              checked={">25" === age}
            ></input>
            <label htmlFor=">25" className="mx-2">
              {">25"}
            </label>
          </div>
        </div>
        <div className="m-2">
          <p>Gender</p>
          <div>
            <input
              name="gender"
              type="radio"
              value={"Female"}
              id="Female"
              checked={"Female" === gender}
              onChange={(e) => onGenderChange(e)}
            ></input>
            <label htmlFor="Female" className="mx-2">
              Female
            </label>
          </div>
          <div>
            <input
              name="gender"
              type="radio"
              value={"Male"}
              id="Male"
              checked={"Male" === gender}
              onChange={(e) => onGenderChange(e)}
            ></input>
            <label htmlFor="Male" className="mx-2">
              Male
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <button
            className="text-sm border p-1"
            onClick={clearFilters}
            style={{ backgroundColor: "#e1e4ea" }}
          >
            Clear
          </button>
        </div>
        <div>
          <button
            className="text-sm border p-1"
            onClick={() => {}}
            style={{ backgroundColor: "#e1e4ea" }}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
