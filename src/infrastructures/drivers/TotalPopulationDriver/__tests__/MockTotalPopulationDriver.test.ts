import { MockTotalPopulationDriver } from "../MockTotalPopulationDriver";

describe("MockTotalPopulationDriver", () => {
  describe("fetchAllByPrefecture", () => {
    it("指定した都道府県の総人口データをリストで取得する", async () => {
      const p = {
        code: 1,
        name: "北海道",
      };
      const d = new MockTotalPopulationDriver();
      const r = await d.fetchAllByPrefecture(p);
      expect(r[0]).toEqual({
        year: 1980,
        value: 12817,
      });
    });
  });
});
