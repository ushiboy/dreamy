import axios, { AxiosInstance } from "axios";

export const createRESASClient = (apiKey: string): AxiosInstance => {
  return axios.create({
    baseURL: "https://opendata.resas-portal.go.jp",
    headers: {
      "X-API-KEY": apiKey,
    },
  });
};
