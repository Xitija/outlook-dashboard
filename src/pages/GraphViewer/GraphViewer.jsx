import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
} from "recharts";
import { useData } from "../../context/AnalyticsDataContext";
import GraphFilters from "../../components/GraphFilters";

export function GraphViewer() {
  const navigate = useNavigate();
  const {
    data,
    clearPreferences,
    getGraphData,
    getCookies,
    filters,
    setFilters,
    setCookie,
  } = useData();
  const [paramUsed, setParamUsed] = useState(false);
  const { start: paramStart, end: paramEnd, age, gender } = useParams();

  const getParamData = () => {
    const data = {};
    const pStart = parseInt(paramStart);
    const pEnd = parseInt(paramEnd);
    if (pStart) {
      data["startDate"] = new Date(pStart);
    }
    if (pEnd) {
      data["endDate"] = new Date(pEnd);
    }
    if (age && (age === ">25" || age === "15-25")) {
      data["age"] = age;
    }
    if (gender && (gender === "Male" || gender === "Female")) {
      data["gender"] = gender;
    }
    return data;
  };

  const setParamInFilter = (paramData) => {
    setParamUsed(true);
    setFilters({ ...paramData });
    clearPreferences(Object.keys(paramData));
    // set in cookie
    Object.keys(paramData).forEach((param) => {
      const value = paramData[param];
      setCookie(
        param,
        param === "startDate" || param === "endDate" ? value.getTime() : value
      );
    });
  };

  const onChange = (dateFromFilter) => {
    const [start, end] = dateFromFilter;
    if (start && end) {
      setFilters({ ...filters, startDate: start, endDate: end });
      setCookie("startDate", start?.getTime(), {
        secure: true,
        "max-age": 604800,
      });
      setCookie("endDate", end?.getTime(), { secure: true, "max-age": 604800 });
    }
  };

  const onAgeSelect = (e) => {
    setFilters({ ...filters, age: e.target.value });
    setCookie("age", e.target.value, { secure: true, "max-age": 604800 });
  };

  const onGenderSelect = (e) => {
    setFilters({ ...filters, gender: e.target.value });
    setCookie("gender", e.target.value, { secure: true, "max-age": 604800 });
  };

  function formatDateToYYYYMMDD(date) {
    // const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleClick = (e) => {
    navigate(`/timetrend/${e.name}`);
  };

  const combinedTimeSpent = data.reduce(
    (acc, curr) => {
      acc["A"] += curr["A"];
      acc["B"] += curr["B"];
      acc["C"] += curr["C"];
      acc["D"] += curr["D"];
      acc["E"] += curr["E"];
      acc["F"] += curr["F"];

      return acc;
    },
    {
      F: 0,
      E: 0,
      D: 0,
      C: 0,
      B: 0,
      A: 0,
    }
  );

  const mappedTimeAndFeature = Object.keys(combinedTimeSpent).map((key) => ({
    name: key,
    timespent: combinedTimeSpent[key],
  }));

  useEffect(() => {
    const paramData = getParamData();
    if (Object.keys(paramData).length && !paramUsed) {
      setParamInFilter(paramData);
    }
    if (filters.startDate && filters.endDate) {
      getGraphData(
        formatDateToYYYYMMDD(filters?.endDate),
        formatDateToYYYYMMDD(filters?.startDate),
        filters.age,
        filters.gender
      );
    } else if (!filters.startDate && !filters.endDate) {
      alert("Please select dates properly!");
    }
  }, [filters, paramUsed]);

  return (
    <>
      <div
        className="flex grow-0 m-4 p-4"
        style={{ backgroundColor: "#ffffff" }}
      >
        <GraphFilters
          onAgeSelect={onAgeSelect}
          onGenderSelect={onGenderSelect}
          onChange={onChange}
        />

        <BarChart
          layout="vertical"
          width={1000}
          height={500}
          data={mappedTimeAndFeature}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" horizontal={false} />
          <XAxis type="number" axisLine={false} />
          <YAxis
            dataKey="name"
            label={{
              value: "Features",
              angle: -90,
              position: "insideLeft",
              fill: "#333",
              fontSize: 18,
            }}
            axisLine={false}
            type="category"
          />
          <Tooltip />
          <Legend />
          <Bar
            onClick={(e) => handleClick(e)}
            dataKey="timespent"
            fill="#220ddb"
            activeBar={<Rectangle fill="#db5c0d" stroke="blue" />}
            barSize={30}
          />
        </BarChart>
      </div>
      {/* <p>
        Please navigate to October 2022 in the calendar to see active dates.
      </p> */}
      <p>
        {" "}
        Default data loaded for date {filters?.startDate.toDateString()} -{" "}
        {filters?.endDate.toDateString()}{" "}
      </p>
      <a
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        href="https://docs.google.com/spreadsheets/d/1bpyl4WpKNyBQnSpEjTupK419Y9EFqeYceh73av-OgkQ/edit?usp=sharing"
      >
        Data is shown correctly as per these numbers
      </a>
    </>
  );
}
