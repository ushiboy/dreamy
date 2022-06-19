import { Prefecture, TotalPopulationPerYear } from "~/domains/models";

export interface TotalPopulationDriverInterface {
  fetchAllByPrefecture(p: Prefecture): Promise<TotalPopulationPerYear[]>;
}
