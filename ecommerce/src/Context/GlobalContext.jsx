import React, { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [storage, setStorage] = React.useState([]);
  const [totalPay, setTotalPay] = React.useState(null);
  const [totalAmount, setTotalAmount] = React.useState(null);
  return (
    <GlobalContext.Provider
      value={{
        storage,
        setStorage,
        totalPay,
        setTotalPay,
        totalAmount,
        setTotalAmount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};