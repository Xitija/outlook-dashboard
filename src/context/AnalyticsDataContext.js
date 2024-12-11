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
  const defaultDate = new Date("2022-10-04"); // to initialize application
  // get default from cookie

  const getCookies = () => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value);
      if (decodedKey === "startDate" || decodedKey === "endDate") {
        acc[decodedKey] = new Date(parseInt(decodedValue));
      } else if (decodedKey.length) {
        acc[key] = decodedValue;
      }
      return acc;
    }, {});
    if (!cookies["startDate"] || !cookies["endDate"]) {
      cookies["startDate"] = defaultDate;
      cookies["endDate"] = defaultDate;
    }
    return cookies;
  };

  const cookieObject = getCookies();
  const [filters, setFilters] = useState({ ...cookieObject });

  // const [defaultDate, setDefaultDate] = useState("2022-10-04");

  function setCookie(name, value, attributes = {}) {
    attributes = {
      path: "/",
      ...attributes,
    };

    if (attributes.expires instanceof Date) {
      attributes.expires = attributes.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let attributeKey in attributes) {
      updatedCookie += "; " + attributeKey;
      let attributeValue = attributes[attributeKey];
      if (attributeValue !== true) {
        updatedCookie += "=" + attributeValue;
      }
    }

    document.cookie = updatedCookie;
  }

  const clearPreferences = (cookieNames) => {
    cookieNames.forEach((name) =>
      setCookie(name, "", {
        "max-age": -1,
      })
    );
  };

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
    filters,
    defaultDate,
    setFilters,
    setCookie,
    clearPreferences
  };

  return (
    <AnalyticsData.Provider value={value}>{children}</AnalyticsData.Provider>
  );
};

export const useData = () => useContext(AnalyticsData);
