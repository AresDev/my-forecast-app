import { useMachine } from "@xstate/react";
import React from "react";
import forecastMachine from "../state/main";
import ForecastList from "../ui/ForecastList";

const ForecastApp = () => {
  const [current, send] = useMachine(forecastMachine, { devTools: true });
  const error = current.matches("error");
  const { results } = current.context;
  const errorButton = error && (
    <button onClick={() => send("RETRY")}>Retry</button>
  );
  const loading  = !current.matches("idle");
  return (
    <>
      <div>
        {loading && <p>Loading...</p>}

        <button onClick={() => send("BTN_CLICKED")}>Get Forecast</button>
        {errorButton}
      </div>
      <div>
        <ForecastList items={results}></ForecastList>
      </div>
    </>
  );
};

export default ForecastApp;