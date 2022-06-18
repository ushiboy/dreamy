import React, { createContext } from "react";

import { PrefectureRepository } from "~/domain/repositories";

export type PrefecturesChartContext = {
  repository: PrefectureRepository;
};

export const context = createContext(
  Object.create(null) as PrefecturesChartContext
);

export const PrefecturesChartProvider: React.FC<{
  value: PrefecturesChartContext;
  children: JSX.Element;
}> = ({ value, children }) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};
