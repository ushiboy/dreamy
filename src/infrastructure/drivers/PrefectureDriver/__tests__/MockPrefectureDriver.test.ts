import { MockPrefectureDriver } from "../MockPrefectureDriver";

describe("MockPrefectureDriver", () => {
  describe("fetchAll", () => {
    it("47都道府県データをリストで取得する", async () => {
      const d = new MockPrefectureDriver();
      const r = await d.fetchAll();
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
