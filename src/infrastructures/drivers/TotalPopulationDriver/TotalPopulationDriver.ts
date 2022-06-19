import { Response } from "./types";

import { Prefecture, TotalPopulationPerYear } from "~/domains/models";
import { TotalPopulationDriverInterface } from "~/domains/repositories";

export abstract class TotalPopulationDriver
  implements TotalPopulationDriverInterface
{
  async fetchAllByPrefecture(p: Prefecture): Promise<TotalPopulationPerYear[]> {
    return this.convertResponse(await this.fetchResponse(p));
  }

  protected convertResponse(r: Response): TotalPopulationPerYear[] {
    const { data } = r.result;
    const matched = data.find(({ label }) => label === "総人口");
    if (matched) {
      return matched.data;
    }
    throw new Error("総人口が取得できません");
  }

  protected abstract fetchResponse(p: Prefecture): Promise<Response>;
}
