import { useState, useEffect, useContext } from "react";

import { context } from "../context";

import { Prefecture } from "~/domain/models/Prefecture";

export const usePrefectures = () => {
  const { repository } = useContext(context);
  const [prefs, setPrefs] = useState<Prefecture[]>([]);

  useEffect(() => {
    (async () => {
      setPrefs(await repository.fetchAll());
    })();
  }, [repository, setPrefs]);

  return {
    prefs,
  };
};
