import React, { createContext } from "react";

import {
  PrefectureRepository,
  TotalPopulationRepository,
} from "~/domains/repositories";

type Context = {
  prefectureRepository: PrefectureRepository;
  totalPopulationRepository: TotalPopulationRepository;
};

export const PrefecturesChartContext = createContext(
  Object.create(null) as Context
);

export const PrefecturesChartContextProvider: React.FC<{
  value: Context;
  children: JSX.Element;
}> = ({ value, children }) => {
  return (
    <PrefecturesChartContext.Provider value={value}>
      {children}
    </PrefecturesChartContext.Provider>
  );
};
