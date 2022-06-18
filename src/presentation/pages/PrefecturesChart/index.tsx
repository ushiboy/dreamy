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

import { PrefecturesChartContainer } from "./Container";
import { usePrefectures, useTotalPopulations } from "./hooks";
import * as S from "./style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PrefecturesChart: React.FC = () => {
  return (
    <PrefecturesChartContainer>
      <Content />
    </PrefecturesChartContainer>
  );
};

const Content: React.FC = () => {
  const { prefs } = usePrefectures();
  const { isSelected, toggle, getChartData } = useTotalPopulations();
  const datasets = getChartData();
  return (
    <S.Root>
      <h1>Title</h1>
      <S.PrefList>
        {prefs.map((p) => (
          <S.PrefListItem key={p.code}>
            <label>
              <input
                type="checkbox"
                checked={isSelected(p)}
                onChange={() => toggle(p)}
              />
              {p.name}
            </label>
          </S.PrefListItem>
        ))}
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
      </S.PrefList>
    </S.Root>
  );
};
