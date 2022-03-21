import { useMachine } from "@xstate/react";
import React from "react";
import forecastMachine from "../state/main";

const ForecastApp = () => {
  const [current, send] = useMachine(forecastMachine, { devTools: true });
  const error = current.matches("error");
  const errorButton = error && (
    <button onClick={() => send("RETRY")}>Retry</button>
  );
  const loading  = !current.matches("idle");
  return (
    <>
      {loading && <p>Loading...</p>}

      <button onClick={() => send("BTN_CLICKED")}>Get Forecast</button>
      {errorButton}
    </>
  );
};

export default ForecastApp;