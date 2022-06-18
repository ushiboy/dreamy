import React from "react";

import { createRESASClient } from "~/infrastructure/httpClient";
import { AppContextProvider } from "~/presentation/AppContext";
import { PrefecturesChart } from "~/presentation/pages/PrefecturesChart";

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
