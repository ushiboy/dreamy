import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

import { TotalPopulationPerYear } from "~/domain/models";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type Props = {
  datasets: { label: string; data: TotalPopulationPerYear[] }[];
};

export const LineChart: React.FC<Props> = ({ datasets }) => (
  <Line
    options={{
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
      },
      parsing: {
        xAxisKey: "year",
        yAxisKey: "value",
      },
      scales: {
        x: {
          type: "linear",
          title: { display: true, text: "年度", align: "end" },
          ticks: {
            callback: (v) => `${v}`,
          },
        },
        y: { title: { display: true, text: "人口数", align: "end" } },
      },
    }}
    data={{
      datasets,
    }}
  />
);
