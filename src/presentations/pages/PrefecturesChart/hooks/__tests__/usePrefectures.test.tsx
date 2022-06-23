import { renderHook } from "@testing-library/react-hooks";
import React from "react";

import { PrefecturesChartContextProvider } from "../../PrefecturesChartContext";
import { usePrefectures } from "../usePrefectures";

import { ApplicationError } from "~/domains/exceptions";
import { Prefecture } from "~/domains/models";
import {
  PrefectureRepository,
  TotalPopulationRepository,
  PrefectureDriverInterface,
} from "~/domains/repositories";
import {
  MockPrefectureDriver,
  MockTotalPopulationDriver,
} from "~/infrastructures/drivers";

describe("usePrefectures", () => {
  const Wrap: React.FC<{
    prefectureRepository: PrefectureRepository;
    children: JSX.Element;
  }> = ({ prefectureRepository, children }) => {
    const totalPopulationRepository = new TotalPopulationRepository(
      new MockTotalPopulationDriver()
    );
    const value = { totalPopulationRepository, prefectureRepository };
    return (
      <PrefecturesChartContextProvider value={value}>
        {children}
      </PrefecturesChartContextProvider>
    );
  };

  it("都道府県を取得して保持する", async () => {
    const prefectureRepository = new PrefectureRepository(
      new MockPrefectureDriver()
    );
    const { result, waitForNextUpdate } = renderHook(() => usePrefectures(), {
      wrapper: Wrap,
      initialProps: {
        prefectureRepository,
        children: <div />,
      },
    });

    expect(result.current.prefs.length).toBe(0);

    await waitForNextUpdate();

    expect(result.current.prefs[0]).toEqual({
      code: 1,
      name: "北海道",
    });
    expect(result.current.prefs.length).toBe(47);
  });

  describe("都道府県データ取得中にエラーが発生した場合", () => {
    class FailDriver implements PrefectureDriverInterface {
      async fetchAll(): Promise<Prefecture[]> {
        throw new ApplicationError("error");
      }
    }

    let jsDomAlert: typeof window.alert;
    let calledAlert = false;

    beforeEach(() => {
      jsDomAlert = window.alert;
      window.alert = jest.fn((m: string) => {
        calledAlert = true;
        console.log(m);
      });
    });
    afterEach(() => {
      window.alert = jsDomAlert;
    });

    it("アラートでエラーメッセージを表示する", async () => {
      const prefectureRepository = new PrefectureRepository(new FailDriver());
      const { waitFor } = renderHook(() => usePrefectures(), {
        wrapper: Wrap,
        initialProps: {
          prefectureRepository,
          children: <div />,
        },
      });

      await waitFor(() => calledAlert);

      expect(window.alert).toHaveBeenCalledWith("error");
    });
  });
});
