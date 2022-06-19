import { ApplicationError } from "./ApplicationError";

export class FailedToFetchPrefecturesException extends ApplicationError {
  constructor() {
    super("都道府県の取得に失敗しました。");
  }
}

export class FailedToFetchTotalPopulationException extends ApplicationError {
  constructor() {
    super("総人口数の取得に失敗しました。");
  }
}
