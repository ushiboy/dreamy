import { PrefectureRepository } from "../PrefectureRepository";

import { MockPrefectureDriver } from "~/infrastructure/drivers";

describe("PrefectureRepository", () => {
  describe("fetchAll", () => {
    it("47都道府県データをリストで取得する", async () => {
      const rep = new PrefectureRepository(new MockPrefectureDriver());
      const r = await rep.fetchAll();
      expect(r[0]).toEqual({
        code: 1,
        name: "北海道",
      });
      expect(r[46]).toEqual({
        code: 47,
        name: "沖縄県",
      });
      expect(r.length).toBe(47);
    });
  });
});
