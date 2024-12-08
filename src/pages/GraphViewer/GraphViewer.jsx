// import "./styles.css";
import { useState, useEffect } from "react";

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
  const { data, getGraphData, defaultDate } = useData();
  const [startDate, setStartDate] = useState(new Date(defaultDate));
  const [endDate, setEndDate] = useState(new Date(defaultDate));
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const onAgeSelect = (e) => {
    setAge(e.target.value);
  };

  const onGenderSelect = (e) => {
    setGender(e.target.value);
  };

  function formatDateToYYYYMMDD(date) {
    // const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleClick = () => {
    console.log("Clicked");
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
    if (startDate && endDate) {
      // getGraphData(formatDateToYYYYMMDD(end), formatDateToYYYYMMDD(start));
      getGraphData(
        formatDateToYYYYMMDD(endDate),
        formatDateToYYYYMMDD(startDate),
        age,
        gender
      );
    } else if (!startDate && !endDate) {
      alert("Please select dates properly!");
    }
  }, [startDate, endDate, age, gender]);

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
            onClick={handleClick}
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
      <p> Default data loaded for date {defaultDate} </p>
      <a
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        href="https://docs.google.com/spreadsheets/d/1bpyl4WpKNyBQnSpEjTupK419Y9EFqeYceh73av-OgkQ/edit?usp=sharing"
      >
        Data is shown correctly as per these numbers
      </a>
    </>
  );
}
