import {
  renderHook,
  act,
  RenderHookResult,
} from "@testing-library/react-hooks";
import React from "react";

import { PrefecturesChartProvider } from "../../PrefecturesChartContext";
import {
  useTotalPopulations,
  UseTotalPopulations,
} from "../useTotalPopulations";

import { ApplicationError } from "~/domains/exceptions";
import { Prefecture, TotalPopulationPerYear } from "~/domains/models";
import {
  PrefectureRepository,
  TotalPopulationRepository,
  TotalPopulationDriverInterface,
} from "~/domains/repositories";
import {
  MockPrefectureDriver,
  MockTotalPopulationDriver,
} from "~/infrastructures/drivers";

describe("useTotalPopulations", () => {
  const Wrap: React.FC<{
    totalPopulationRepository: TotalPopulationRepository;
    children: JSX.Element;
  }> = ({ totalPopulationRepository, children }) => {
    const prefectureRepository = new PrefectureRepository(
      new MockPrefectureDriver()
    );
    const value = { totalPopulationRepository, prefectureRepository };
    return (
      <PrefecturesChartProvider value={value}>
        {children}
      </PrefecturesChartProvider>
    );
  };

  describe("toggle", () => {
    const p = {
      code: 1,
      name: "北海道",
    };

    describe("指定した都道府県が未選択の場合", () => {
      describe("通常の場合", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let r: RenderHookResult<any, UseTotalPopulations>;
        beforeEach(() => {
          const totalPopulationRepository = new TotalPopulationRepository(
            new MockTotalPopulationDriver()
          );
          r = renderHook(() => useTotalPopulations(), {
            wrapper: Wrap,
            initialProps: {
              totalPopulationRepository,
              children: <div />,
            },
          });
        });

        it("指定した都道府県を選択済みにする", async () => {
          const { result, waitForNextUpdate } = r;
          expect(result.current.isSelected(p)).toBeFalsy();
          act(() => result.current.toggle(p));
          await waitForNextUpdate();

          expect(result.current.isSelected(p)).toBeTruthy();
        });

        it("指定した都道府県の総人口データを取得する", async () => {
          const { result, waitForNextUpdate } = r;
          let data = result.current.getChartData();
          expect(data.length).toBe(0);

          act(() => result.current.toggle(p));
          await waitForNextUpdate();

          data = result.current.getChartData();
          expect(data.length).toBe(1);
          expect(data[0].label).toBe(p.name);
        });
      });

      describe("都道府県の総人口データ取得中にエラーが発生した場合", () => {
        class FailDriver implements TotalPopulationDriverInterface {
          async fetchAllByPrefecture(
            p: Prefecture
          ): Promise<TotalPopulationPerYear[]> {
            console.log(p);
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
          const totalPopulationRepository = new TotalPopulationRepository(
            new FailDriver()
          );
          const { result, waitFor } = renderHook(() => useTotalPopulations(), {
            wrapper: Wrap,
            initialProps: {
              totalPopulationRepository,
              children: <div />,
            },
          });

          act(() => result.current.toggle(p));
          await waitFor(() => calledAlert);

          expect(window.alert).toHaveBeenCalledWith("error");
        });
      });
    });

    describe("指定した都道府県が選択済みの場合", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let r: RenderHookResult<any, UseTotalPopulations>;
      beforeEach(() => {
        const m = new Map([[p, []]]);
        r = renderHook(() => useTotalPopulations(m), {
          wrapper: Wrap,
        });
      });

      it("指定した都道府県を選択解除する", async () => {
        const { result } = r;
        expect(result.current.isSelected(p)).toBeTruthy();

        act(() => result.current.toggle(p));

        expect(result.current.isSelected(p)).toBeFalsy();
      });
    });
  });

  describe("isSelected", () => {
    const selected = {
      code: 1,
      name: "北海道",
    };
    const unselected = {
      code: 47,
      name: "沖縄県",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let r: RenderHookResult<any, UseTotalPopulations>;
    beforeEach(() => {
      const m = new Map([[selected, []]]);
      r = renderHook(() => useTotalPopulations(m), {
        wrapper: Wrap,
      });
    });

    describe("指定した都道府県が未選択の場合", () => {
      it("falseを返す", async () => {
        expect(r.result.current.isSelected(unselected)).toBeFalsy();
      });
    });

    describe("指定した都道府県が選択済みの場合", () => {
      it("tureを返す", async () => {
        expect(r.result.current.isSelected(selected)).toBeTruthy();
      });
    });
  });

  describe("getChartData", () => {
    const p1 = {
      code: 1,
      name: "北海道",
    };
    const p2 = {
      code: 47,
      name: "沖縄県",
    };
    const p3 = {
      code: 2,
      name: "青森県",
    };
    const d1 = [{ year: 2000, value: 1 }];
    const d2 = [{ year: 2000, value: 2 }];
    const d3 = [{ year: 2000, value: 3 }];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let r: RenderHookResult<any, UseTotalPopulations>;
    beforeEach(() => {
      const m = new Map([
        [p1, d1],
        [p2, d2],
        [p3, d3],
      ]);
      r = renderHook(() => useTotalPopulations(m), {
        wrapper: Wrap,
      });
    });

    it("都道府県コードの昇順にソートしてグラフ用のデータを返す", async () => {
      expect(r.result.current.getChartData()).toEqual([
        { label: p1.name, data: d1 },
        { label: p3.name, data: d3 },
        { label: p2.name, data: d2 },
      ]);
    });
  });
});
