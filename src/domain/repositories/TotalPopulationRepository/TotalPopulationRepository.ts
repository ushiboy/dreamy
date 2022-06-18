import { TotalPopulationDriverInterface } from "./types";

import { Prefecture, TotalPopulationPerYear } from "~/domain/models";

export class TotalPopulationRepository {
  driver: TotalPopulationDriverInterface;

  constructor(driver: TotalPopulationDriverInterface) {
    this.driver = driver;
  }

  fetchAllByPrefecture(p: Prefecture): Promise<TotalPopulationPerYear[]> {
    return this.driver.fetchAllByPrefecture(p);
  }
}
