import React, { useContext } from "react";

import { PrefecturesChartProvider } from "./context";

import {
  PrefectureRepository,
  TotalPopulationRepository,
} from "~/domain/repositories";
import {
  // MockPrefectureDriver,
  // MockTotalPopulationDriver,
  RESASPrefectureDriver,
  RESASTotalPopulationDriver,
} from "~/infrastructure/drivers";
import { context as AppContext } from "~/presentation/AppContext";

export const PrefecturesChartContainer: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { RESASClient } = useContext(AppContext);
  const prefectureRepository = new PrefectureRepository(
    new RESASPrefectureDriver(RESASClient)
    // new MockPrefectureDriver()
  );
  const totalPopulationRepository = new TotalPopulationRepository(
    new RESASTotalPopulationDriver(RESASClient)
    // new MockTotalPopulationDriver()
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
