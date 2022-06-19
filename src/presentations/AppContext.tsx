import { AxiosInstance } from "axios";
import React, { createContext } from "react";

export type AppContext = {
  RESASClient: AxiosInstance;
};

export const context = createContext(Object.create(null) as AppContext);

export const AppContextProvider: React.FC<{
  value: AppContext;
  children: JSX.Element;
}> = ({ value, children }) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};
