import { useState, useEffect, useContext } from "react";

import { PrefecturesChartContext } from "../PrefecturesChartContext";

import { ApplicationError } from "~/domains/exceptions";
import { Prefecture } from "~/domains/models";

export const usePrefectures = () => {
  const { prefectureRepository } = useContext(PrefecturesChartContext);
  const [prefs, setPrefs] = useState<Prefecture[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setPrefs(await prefectureRepository.fetchAll());
      } catch (e) {
        alert((e as ApplicationError).message);
      }
    })();
  }, [prefectureRepository, setPrefs]);

  return {
    prefs,
  };
};
