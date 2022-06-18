import { useState } from "react";

import { Prefecture } from "~/domain/models/Prefecture";

export const useSelections = () => {
  const [selectedPrefs, setSelectedPrefs] = useState<Set<Prefecture>>(
    new Set()
  );

  const toggle = (p: Prefecture) => {
    if (selectedPrefs.has(p)) {
      selectedPrefs.delete(p);
      setSelectedPrefs(new Set(selectedPrefs));
    } else {
      selectedPrefs.add(p);
      setSelectedPrefs(new Set(selectedPrefs));
    }
  };

  return {
    selectedPrefs,
    toggle,
  };
};
