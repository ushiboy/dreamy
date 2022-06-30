import { useState, useEffect, useContext } from "react";

import { PrefecturesChartContext } from "../PrefecturesChartContext";

import { ApplicationError } from "~/domains/exceptions";
import { Prefecture } from "~/domains/models";
import { useCallOnce } from "~/presentations/hooks";

export const usePrefectures = () => {
  const { prefectureRepository } = useContext(PrefecturesChartContext);
  const [prefs, setPrefs] = useState<Prefecture[]>([]);
  const { execute } = useCallOnce(async () => {
    try {
      setPrefs(await prefectureRepository.fetchAll());
    } catch (e) {
      alert((e as ApplicationError).message);
    }
  });

  useEffect(() => {
    execute();
  }, [prefectureRepository, setPrefs]);

  return {
    prefs,
  };
};
