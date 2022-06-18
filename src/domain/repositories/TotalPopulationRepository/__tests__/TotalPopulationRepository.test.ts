import { TotalPopulationRepository } from "../TotalPopulationRepository";

import { MockTotalPopulationDriver } from "~/infrastructure/drivers";

describe("TotalPopulationRepository", () => {
  describe("fetchAllByPrefecture", () => {
    it("指定した都道府県の総人口データをリストで取得する", async () => {
      const rep = new TotalPopulationRepository(
        new MockTotalPopulationDriver()
      );
      const p = {
        code: 1,
        name: "北海道",
      };
      const r = await rep.fetchAllByPrefecture(p);
      expect(r[0]).toEqual({
        year: 1980,
        value: 12817,
      });
    });
  });
});
