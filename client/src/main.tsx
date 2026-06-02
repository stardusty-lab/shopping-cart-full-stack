import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { worker } from "@/mocks/msw/browser";

import { AppProviders } from "@/providers";

import App from "./App.tsx";

await worker.start({
  serviceWorker: {
    url: `/mockServiceWorker.js`,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
