import { Prefecture } from "~/domain/models";

export interface PrefectureDriverInterface {
  fetchAll(): Promise<Prefecture[]>;
}
