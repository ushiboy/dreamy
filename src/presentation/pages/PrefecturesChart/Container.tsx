import React from "react";

import { PrefecturesChartProvider } from "./context";

import {
  PrefectureRepository,
  TotalPopulationRepository,
} from "~/domain/repositories";
import {
  MockPrefectureDriver,
  MockTotalPopulationDriver,
} from "~/infrastructure/drivers";

export const PrefecturesChartContainer: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const prefectureRepository = new PrefectureRepository(
    new MockPrefectureDriver()
  );
  const totalPopulationRepository = new TotalPopulationRepository(
    new MockTotalPopulationDriver()
  );
  return (
    <PrefecturesChartProvider
      value={{
        prefectureRepository,
        totalPopulationRepository,
      }}
    >
      {children}
    </PrefecturesChartProvider>
  );
};
