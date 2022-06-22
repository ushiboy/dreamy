import React, { useContext } from "react";

import { PrefecturesChartContainer } from "./PrefecturesChartContainer";
import { PrefecturesChartProvider } from "./PrefecturesChartContext";

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

export const PrefecturesChart: React.FC = () => {
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
      <PrefecturesChartContainer />
    </PrefecturesChartProvider>
  );
};
