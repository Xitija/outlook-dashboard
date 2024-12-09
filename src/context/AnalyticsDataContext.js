import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

export const AnalyticsData = createContext();

export const AnalyticsDataProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiSecret = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState([]);
  // get default from cookie
  const [defaultDate, setDefaultDate] = useState("2022-10-04");

  const getGraphData0 = async (lte, gte) => {
    const response = await fetch(`${apiUrl}/myquery`, {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": apiSecret,
      },
      method: "POST",
      body: JSON.stringify({ lte, gte }),
    });

    const result = await response.json();
    setData(result.analytics_data);
    return result;
  };

  const getGraphData = async (lte, gte, age, gender) => {
    const config = getGraphQuery(lte, gte, age, gender);
    const res = await fetch(
      "https://brief-shiner-74.hasura.app/v1/graphql",
      config
    );

    const result = await res.json();
    setData(result.data.analytics_data);
    return result;
  };

  const getGraphQuery = (lte, gte, age = 0, gender = "") => {
    const whereObj = {
      day: { _lte: lte, _gte: gte },
      ...(age ? { age: { _eq: age } } : {}),
      ...(gender ? { gender: { _eq: gender } } : {}),
    };

    let where = "";
    Object.keys(whereObj).forEach((e) => {
      if (e === "day") {
        where += `${e} : {_lte: "${whereObj.day._lte}" , _gte: "${whereObj.day._gte}" }`;
      } else {
        where += `${e} : {_eq: "${whereObj[e]._eq}"}`;
      }
    });

    const query = `query graphData {
        analytics_data(
          where: 
            {${where}}
        ) {
            gender
            day
            analytics_id
            age
            F
            E
            D
            C
            B
            A
          }
        }`;

    const config = {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    return config;
  };

  const value = {
    getGraphData,
    data,
    defaultDate,
  };

  return (
    <AnalyticsData.Provider value={value}>{children}</AnalyticsData.Provider>
  );
};

export const useData = () => useContext(AnalyticsData);
