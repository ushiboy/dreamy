import { RESASPrefectureDriver } from "../RESASPrefectureDriver";

import { FailedToFetchPrefecturesException } from "~/domains/exceptions";
import { Prefecture } from "~/domains/models";
import { createRESASClient } from "~/infrastructures/httpClient";

describe("RESASPrefectureDriver", () => {
  describe("fetchAll", () => {
    const apiKey = "abc";
    const client = createRESASClient(apiKey);

    describe("通常の場合", () => {
      let r: Prefecture[];

      beforeEach(async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(client, "get").mockResolvedValue({
          data: {
            message: null,
            result: [{ prefCode: 1, prefName: "北海道" }],
          },
        });
        const d = new RESASPrefectureDriver(client);
        r = await d.fetchAll();
      });

      it("47都道府県データをリストで取得する", () => {
        expect(r[0]).toEqual({ code: 1, name: "北海道" });
      });

      it("GET /api/v1/prefectures リクエストを送信する", () => {
        expect(client.get).toHaveBeenCalledWith("/api/v1/prefectures");
      });
    });

    describe("WEB API実行でエラーが発生した場合", () => {
      beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(client, "get").mockImplementation(() => {
          throw new Error("error");
        });
      });

      it("FailedToFetchPrefecturesExceptionを発生させる", async () => {
        const d = new RESASPrefectureDriver(client);
        await expect(d.fetchAll()).rejects.toThrow(
          FailedToFetchPrefecturesException
        );
      });
    });
  });
});
