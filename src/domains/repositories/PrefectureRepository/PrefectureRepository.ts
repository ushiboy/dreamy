import { PrefectureDriverInterface } from "./types";

import { Prefecture } from "~/domains/models";

export class PrefectureRepository {
  driver: PrefectureDriverInterface;

  constructor(driver: PrefectureDriverInterface) {
    this.driver = driver;
  }

  fetchAll(): Promise<Prefecture[]> {
    return this.driver.fetchAll();
  }
}
