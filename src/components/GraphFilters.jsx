import { useState } from "react";
import DatePicker from "react-datepicker";
import { useData } from "../context/AnalyticsDataContext";

export default function GraphFilters({
  onAgeSelect,
  onGenderSelect,
  onChange,
}) {
  const { defaultDate } = useData();

  const [startDate, setStartDate] = useState(new Date(defaultDate));
  const [endDate, setEndDate] = useState(new Date(defaultDate));
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

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

  return (
    <div className="flex flex-col items-start justify-between my-2">
      <DatePicker
        selected={startDate}
        onChange={onDateChange}
        minDate={new Date("2022-10-04")}
        maxDate={new Date("2022-10-30")}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        showDisabledMonthNavigation
      />
      <div>
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
      <div>
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
      <button
        className="text-sm border p-1"
        onClick={() => {
          setAge(null);
          setGender(null);
        }}
        style={{ backgroundColor: "#e1e4ea" }}
      >
        Clear
      </button>
    </div>
  );
}
