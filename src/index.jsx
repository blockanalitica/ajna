import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import "@/index.css";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: "ajna",
  integrations: [],
  tracesSampleRate: 0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={
        <div className="text-center mt-10">
          <h1 className="text-4xl">ERROR</h1>
          <p className="mt-10">Oops, it seems that something went wrong.</p>
        </div>
      }
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
);
