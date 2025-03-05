import React, { createContext, useState } from "react";

export const MortgageContext = createContext({});

const MortgageProvider = ({ children }) => {
  const [mortgageAmount, setMortgageAmount] = useState(5000);

  return (
    <MortgageContext.Provider value={{ mortgageAmount, setMortgageAmount }}>
      {children}
    </MortgageContext.Provider>
  );
};

export default MortgageProvider;
