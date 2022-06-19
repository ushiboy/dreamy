import { RESASTotalPopulationDriver } from "../RESASTotalPopulationDriver";

import { FailedToFetchTotalPopulationException } from "~/domains/exceptions";
import { TotalPopulationPerYear } from "~/domains/models";
import { createRESASClient } from "~/infrastructures/httpClient";

describe("RESASTotalPopulationDriver", () => {
  describe("fetchAllByPrefecture", () => {
    const apiKey = "abc";
    const client = createRESASClient(apiKey);

    const p = {
      code: 1,
      name: "北海道",
    };

    describe("通常の場合", () => {
      let r: TotalPopulationPerYear[];
      beforeEach(async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(client, "get").mockResolvedValue({
          data: {
            message: null,
            result: {
              boundaryYear: 2015,
              data: [
                {
                  label: "総人口",
                  data: [
                    {
                      year: 1980,
                      value: 12817,
                    },
                  ],
                },
              ],
            },
          },
        });
        const d = new RESASTotalPopulationDriver(client);
        r = await d.fetchAllByPrefecture(p);
      });

      it("指定した都道府県の総人口データをリストで取得する", async () => {
        expect(r[0]).toEqual({
          year: 1980,
          value: 12817,
        });
      });

      it("GET /api/v1/population/composition/perYear リクエストを送信する", () => {
        expect(client.get).toHaveBeenCalledWith(
          "/api/v1/population/composition/perYear",
          {
            params: {
              prefCode: p.code,
              cityCode: "-",
            },
          }
        );
      });
    });

    describe("WEB API実行でエラーが発生した場合", () => {
      beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(client, "get").mockImplementation(() => {
          throw new Error("error");
        });
      });

      it("FailedToFetchTotalPopulationExceptionを発生させる", async () => {
        const d = new RESASTotalPopulationDriver(client);
        await expect(d.fetchAllByPrefecture(p)).rejects.toThrow(
          FailedToFetchTotalPopulationException
        );
      });
    });
  });
});
