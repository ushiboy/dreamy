import { AxiosInstance } from "axios";

import { PrefectureDriver } from "./PrefectureDriver";
import { Response } from "./types";

export class RESASPrefectureDriver extends PrefectureDriver {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    super();
    this.client = client;
  }

  protected async fetchResponse(): Promise<Response> {
    const r = await this.client.get<Response>("/api/v1/prefectures");
    return r.data;
  }
}
