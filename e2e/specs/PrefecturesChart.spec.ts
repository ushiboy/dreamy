import { test, expect } from "@playwright/test";

import { PrefecturesChartPage } from "../pageObjects";

test.describe("PrefecturesChart", () => {
  test("クリックした都道府県を選択状態にする", async ({ page }) => {
    const p = new PrefecturesChartPage(page);
    await p.goto();

    expect(await p.isSelectedPrefectureByCode(1)).toBeFalsy();

    await p.clickPrefectureByCode(1);
    expect(await p.isSelectedPrefectureByCode(1)).toBeTruthy();
  });
});
