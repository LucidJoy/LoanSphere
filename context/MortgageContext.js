import React, { createContext, useState } from "react";

export const MortgageContext = createContext({});

const MortgageProvider = ({ children }) => {
  const [mortgageAmount, setMortgageAmount] = useState(5000);
  const [usaState, setUsaState] = useState("");
  const [regions, setRegions] = useState([]);
  const [houseType, setHouseType] = useState("");

  // Dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Loadings
  const [regionLoader, setRegionLoader] = useState(false);

  return (
    <MortgageContext.Provider
      value={{
        mortgageAmount,
        setMortgageAmount,
        usaState,
        setUsaState,
        regions,
        setRegions,
        regionLoader,
        setRegionLoader,
        houseType,
        setHouseType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </MortgageContext.Provider>
  );
};

export default MortgageProvider;
