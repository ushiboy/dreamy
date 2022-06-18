import { Prefecture, TotalPopulationPerYear } from "~/domain/models";

export interface TotalPopulationDriverInterface {
  fetchAllByPrefecture(p: Prefecture): Promise<TotalPopulationPerYear[]>;
}
