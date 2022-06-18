export type Response = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: ResultData[];
  };
};

export type ResultData = {
  label: string;
  data: Data[];
};

export type Data = {
  year: number;
  value: number;
  rate?: number;
};
