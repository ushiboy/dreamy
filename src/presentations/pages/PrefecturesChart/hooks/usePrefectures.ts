import { useState, useEffect, useContext } from "react";

import { context } from "../context";

import { ApplicationError } from "~/domains/exceptions";
import { Prefecture } from "~/domains/models";

export const usePrefectures = () => {
  const { prefectureRepository } = useContext(context);
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
