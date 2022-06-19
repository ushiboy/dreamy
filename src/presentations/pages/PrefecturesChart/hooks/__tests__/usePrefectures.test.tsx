import { renderHook } from "@testing-library/react-hooks";
import React from "react";

import { PrefecturesChartProvider } from "../../context";
import { usePrefectures } from "../usePrefectures";

import {
  PrefectureRepository,
  TotalPopulationRepository,
} from "~/domains/repositories";
import {
  MockPrefectureDriver,
  MockTotalPopulationDriver,
} from "~/infrastructures/drivers";

describe("usePrefectures", () => {
  const Wrap: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const prefectureRepository = new PrefectureRepository(
      new MockPrefectureDriver()
    );
    const totalPopulationRepository = new TotalPopulationRepository(
      new MockTotalPopulationDriver()
    );
    const value = { totalPopulationRepository, prefectureRepository };
    return (
      <PrefecturesChartProvider value={value}>
        {children}
      </PrefecturesChartProvider>
    );
  };

  it("都道府県を取得して保持する", async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePrefectures(), {
      wrapper: Wrap,
    });

    expect(result.current.prefs.length).toBe(0);

    await waitForNextUpdate();

    expect(result.current.prefs[0]).toEqual({
      code: 1,
      name: "北海道",
    });
    expect(result.current.prefs.length).toBe(47);
  });
});
