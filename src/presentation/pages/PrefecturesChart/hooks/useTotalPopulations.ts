import { useState, useContext } from "react";

import { context } from "../context";

import { Prefecture, TotalPopulationPerYear } from "~/domain/models";

export const useTotalPopulations = (
  initTotalPopulations?: Map<Prefecture, TotalPopulationPerYear[]>
) => {
  const { totalPopulationRepository } = useContext(context);
  const [totalPopulations, setTotalPopulations] = useState<
    Map<Prefecture, TotalPopulationPerYear[]>
  >(initTotalPopulations || new Map());

  const fetchTotalPopulationsByPrefecture = async (p: Prefecture) => {
    const r = await totalPopulationRepository.fetchAllByPrefecture(p);
    setTotalPopulations((prev) => {
      prev.set(p, r);
      return new Map(prev);
    });
  };

  const toggle = (p: Prefecture) => {
    if (totalPopulations.has(p)) {
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
    return Array.from(totalPopulations.keys())
      .sort((a, b) => {
        return a.code - b.code;
      })
      .map((p) => ({
        label: p.name,
        data: totalPopulations.get(p) || [],
      }));
  };

  return {
    isSelected,
    toggle,
    getChartData,
  };
};

export type UseTotalPopulations = ReturnType<typeof useTotalPopulations>;
