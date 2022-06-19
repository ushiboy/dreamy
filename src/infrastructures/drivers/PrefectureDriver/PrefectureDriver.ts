import { Response } from "./types";

import { Prefecture } from "~/domains/models";
import { PrefectureDriverInterface } from "~/domains/repositories";

export abstract class PrefectureDriver implements PrefectureDriverInterface {
  async fetchAll(): Promise<Prefecture[]> {
    return this.convertResponseToPrefectures(await this.fetchResponse());
  }

  protected convertResponseToPrefectures(r: Response): Prefecture[] {
    return r.result.map(({ prefCode, prefName }) => ({
      code: prefCode,
      name: prefName,
    }));
  }

  protected abstract fetchResponse(): Promise<Response>;
}
