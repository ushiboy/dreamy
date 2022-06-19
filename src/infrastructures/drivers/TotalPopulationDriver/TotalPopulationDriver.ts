import { Response } from "./types";

import { FailedToFetchTotalPopulationException } from "~/domains/exceptions";
import { Prefecture, TotalPopulationPerYear } from "~/domains/models";
import { TotalPopulationDriverInterface } from "~/domains/repositories";

export abstract class TotalPopulationDriver
  implements TotalPopulationDriverInterface
{
  async fetchAllByPrefecture(p: Prefecture): Promise<TotalPopulationPerYear[]> {
    try {
      return this.convertResponse(await this.fetchResponse(p));
    } catch (e) {
      throw new FailedToFetchTotalPopulationException();
    }
  }

  protected convertResponse(r: Response): TotalPopulationPerYear[] {
    const { data } = r.result;
    const matched = data.find(({ label }) => label === "総人口");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return matched!.data;
  }

  protected abstract fetchResponse(p: Prefecture): Promise<Response>;
}
