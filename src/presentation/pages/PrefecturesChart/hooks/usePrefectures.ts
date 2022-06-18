import { useState, useEffect, useContext } from "react";

import { context } from "../context";

import { Prefecture } from "~/domain/models";

export const usePrefectures = () => {
  const { prefectureRepository } = useContext(context);
  const [prefs, setPrefs] = useState<Prefecture[]>([]);

  useEffect(() => {
    (async () => {
      setPrefs(await prefectureRepository.fetchAll());
    })();
  }, [prefectureRepository, setPrefs]);

  return {
    prefs,
  };
};
