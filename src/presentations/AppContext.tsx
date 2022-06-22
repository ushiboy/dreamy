import { AxiosInstance } from "axios";
import React, { createContext } from "react";

type Context = {
  RESASClient: AxiosInstance;
};

export const AppContext = createContext(Object.create(null) as Context);

export const AppContextProvider: React.FC<{
  value: Context;
  children: JSX.Element;
}> = ({ value, children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
