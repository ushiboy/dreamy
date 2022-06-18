import React from "react";

import { PrefecturesChartContainer } from "./Container";
import { usePrefectures, useSelections } from "./hooks";
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
  const { selectedPrefs, toggle } = useSelections();
  return (
    <S.Root>
      <h1>Title</h1>
      <S.PrefList>
        {prefs.map((p) => (
          <S.PrefListItem key={p.code}>
            <label>
              <input
                type="checkbox"
                checked={selectedPrefs.has(p)}
                onChange={() => toggle(p)}
              />
              {p.name}
            </label>
          </S.PrefListItem>
        ))}
      </S.PrefList>
    </S.Root>
  );
};
