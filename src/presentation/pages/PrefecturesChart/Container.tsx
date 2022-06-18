import React from "react";

import { PrefecturesChartProvider } from "./context";

import { PrefectureRepository } from "~/domain/repositories";
import { MockPrefectureDriver } from "~/infrastructure/drivers";

export const PrefecturesChartContainer: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const repository = new PrefectureRepository(new MockPrefectureDriver());
  return (
    <PrefecturesChartProvider
      value={{
        repository,
      }}
    >
      {children}
    </PrefecturesChartProvider>
  );
};
