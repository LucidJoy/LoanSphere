import React, { createContext, useState } from "react";

export const MortgageContext = createContext({});

const MortgageProvider = ({ children }) => {
  const [mortgageAmount, setMortgageAmount] = useState(5000);
  const [usaState, setUsaState] = useState("");
  const [regions, setRegions] = useState([]); // all regions of the selected state
  const [selectedRegion, setSelectedRegion] = useState("");
  const [houseType, setHouseType] = useState("");

  // Dates and Years
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  // Loadings
  const [regionLoader, setRegionLoader] = useState(false);

  // graph data
  const [graphPoints, setGraphPoints] = useState([]);

  // API
  // https://gage-app-ggvzu.ondigitalocean.app/get-historical-data/?region_state=CO&region_name=Boulder, CO&housing_type=2 - BedRoom&start_date=2014-01-31&end_date=2014-06-31

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
        selectedRegion,
        setSelectedRegion,
        graphPoints,
        setGraphPoints,
        year,
        setYear,
      }}
    >
      {children}
    </MortgageContext.Provider>
  );
};

export default MortgageProvider;
