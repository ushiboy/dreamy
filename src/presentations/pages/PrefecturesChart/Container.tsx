import React, { useContext } from "react";

import { PrefecturesChartProvider } from "./context";

import {
  PrefectureRepository,
  TotalPopulationRepository,
} from "~/domains/repositories";
import {
  // MockPrefectureDriver,
  // MockTotalPopulationDriver,
  RESASPrefectureDriver,
  RESASTotalPopulationDriver,
} from "~/infrastructures/drivers";
import { AppContext } from "~/presentations/AppContext";

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
