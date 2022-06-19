import { Prefecture } from "~/domains/models";

export interface PrefectureDriverInterface {
  fetchAll(): Promise<Prefecture[]>;
}
