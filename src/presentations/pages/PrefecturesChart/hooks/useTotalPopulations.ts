import { useState, useContext } from "react";

import { context } from "../context";

import { ApplicationError } from "~/domains/exceptions";
import { Prefecture, TotalPopulationPerYear } from "~/domains/models";

export const useTotalPopulations = (
  initTotalPopulations?: Map<Prefecture, TotalPopulationPerYear[]>
) => {
  const { totalPopulationRepository } = useContext(context);
  const [totalPopulations, setTotalPopulations] = useState<
    Map<Prefecture, TotalPopulationPerYear[]>
  >(initTotalPopulations || new Map());

  const fetchTotalPopulationsByPrefecture = async (p: Prefecture) => {
    try {
      const r = await totalPopulationRepository.fetchAllByPrefecture(p);
      setTotalPopulations((prev) => {
        prev.set(p, r);
        return new Map(prev);
      });
    } catch (e) {
      alert((e as ApplicationError).message);
    }
  };

  const toggle = (p: Prefecture) => {
    if (isSelected(p)) {
      setTotalPopulations((prev) => {
        prev.delete(p);
        return new Map(prev);
      });
    } else {
      setTotalPopulations((prev) => {
        prev.set(p, []);
        return new Map(prev);
      });
      fetchTotalPopulationsByPrefecture(p);
    }
  };

  const isSelected = (p: Prefecture) => totalPopulations.has(p);

  const getChartData = () => {
    return Array.from(totalPopulations.entries())
      .sort((a, b) => {
        return a[0].code - b[0].code;
      })
      .map((p) => ({
        label: p[0].name,
        data: p[1],
      }));
  };

  return {
    isSelected,
    toggle,
    getChartData,
  };
};

export type UseTotalPopulations = ReturnType<typeof useTotalPopulations>;
