import React from "react";

import { LineChart } from "./components/LineChart";
import { PrefList } from "./components/PrefList";
import { usePrefectures, useTotalPopulations } from "./hooks";
import { PrefecturesChartContainer } from "./PrefecturesChartContainer";
import * as S from "./style";

export const PrefecturesChart: React.FC = () => {
  return (
    <PrefecturesChartContainer>
      <Content />
    </PrefecturesChartContainer>
  );
};

const Content: React.FC = () => {
  const { prefs } = usePrefectures();
  const { isSelected, toggle, getChartData } = useTotalPopulations();
  const datasets = getChartData();
  return (
    <S.Root>
      <h1>Title</h1>
      <PrefList prefs={prefs} isSelected={isSelected} toggle={toggle} />
      <LineChart datasets={datasets} />
    </S.Root>
  );
};
