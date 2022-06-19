import { RESASPrefectureDriver } from "../RESASPrefectureDriver";

import { Prefecture } from "~/domain/models";
import { createRESASClient } from "~/infrastructure/httpClient";

describe("RESASPrefectureDriver", () => {
  describe("fetchAll", () => {
    const apiKey = "abc";
    const client = createRESASClient(apiKey);

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
});
