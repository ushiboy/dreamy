import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";

const { VITE_API_KEY } = import.meta.env;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App apiKey={VITE_API_KEY} />
  </React.StrictMode>
);
