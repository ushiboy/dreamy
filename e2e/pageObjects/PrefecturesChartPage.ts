import { Locator, Page } from "@playwright/test";

export class PrefecturesChartPage {
  readonly page: Page;
  readonly prefecturesChart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.prefecturesChart = page.locator("[data-testid=prefecturesChart]");
  }

  async goto() {
    return this.page.goto("http://localhost:3000/");
  }

  async clickPrefectureByCode(code: number) {
    return this.prefecturesChart
      .locator(`[data-testid=prefListItemCheckbox-${code}]`)
      .click();
  }

  async isSelectedPrefectureByCode(code: number): Promise<boolean> {
    return this.prefecturesChart
      .locator(`[data-testid=prefListItemCheckbox-${code}]`)
      .evaluate((node: HTMLInputElement) => node.checked);
  }
}
