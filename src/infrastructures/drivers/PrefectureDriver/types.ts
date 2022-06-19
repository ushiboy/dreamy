export type Response = {
  message: string | null;
  result: ResultItem[];
};

export type ResultItem = {
  prefCode: number;
  prefName: string;
};
