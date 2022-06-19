import { AxiosInstance } from "axios";

import { TotalPopulationDriver } from "./TotalPopulationDriver";
import { Response } from "./types";

import { Prefecture } from "~/domains/models";

export class RESASTotalPopulationDriver extends TotalPopulationDriver {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    super();
    this.client = client;
  }

  protected async fetchResponse(p: Prefecture): Promise<Response> {
    const r = await this.client.get<Response>(
      "/api/v1/population/composition/perYear",
      {
        params: {
          prefCode: p.code,
          cityCode: "-",
        },
      }
    );
    return r.data;
  }
}
