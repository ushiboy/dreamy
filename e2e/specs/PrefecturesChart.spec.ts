import { test, expect } from "@playwright/test";

import { PrefecturesChartPage } from "../pageObjects";

test.describe("PrefecturesChart", () => {
  test("クリックした都道府県を選択状態にする", async ({ page }) => {
    const p = new PrefecturesChartPage(page);
    await p.goto();

    expect(await p.isSelectedPrefectureByCode(47)).toBeFalsy();

    await p.clickPrefectureByCode(47);
    expect(await p.isSelectedPrefectureByCode(47)).toBeTruthy();

    await p.clickPrefectureByCode(1);
    expect(await p.isSelectedPrefectureByCode(47)).toBeTruthy();
    expect(await p.isSelectedPrefectureByCode(1)).toBeTruthy();

    await p.clickPrefectureByCode(47);
    expect(await p.isSelectedPrefectureByCode(47)).toBeFalsy();
    expect(await p.isSelectedPrefectureByCode(1)).toBeTruthy();
  });
});
