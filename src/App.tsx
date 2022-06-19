import React from "react";

import { createRESASClient } from "~/infrastructures/httpClient";
import { AppContextProvider } from "~/presentations/AppContext";
import { PrefecturesChart } from "~/presentations/pages/PrefecturesChart";

export type Props = {
  apiKey: string;
};

export const App: React.FC<Props> = ({ apiKey }) => {
  const RESASClient = createRESASClient(apiKey);
  return (
    <AppContextProvider value={{ RESASClient }}>
      <PrefecturesChart />
    </AppContextProvider>
  );
};
