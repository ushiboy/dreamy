import React from "react";

import { LineChart } from "./components/LineChart";
import { PrefList } from "./components/PrefList";
import { usePrefectures, useTotalPopulations } from "./hooks";
import * as S from "./style";

export const PrefecturesChartContainer: React.FC = () => {
  const { prefs } = usePrefectures();
  const { isSelected, toggle, getChartData } = useTotalPopulations();
  const datasets = getChartData();
  return (
    <S.Root data-testid="prefecturesChart">
      <h1>Title</h1>
      <PrefList prefs={prefs} isSelected={isSelected} toggle={toggle} />
      <LineChart datasets={datasets} />
    </S.Root>
  );
};
