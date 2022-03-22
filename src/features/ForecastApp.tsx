import React from "react";
import { useMachine } from "@xstate/react";
import forecastMachine from "../state/main";


import AddressForm from "./AddressForm";
import './ForecastApp.scss';
import ForecastList from "../ui/ForecastList/ForecastList";

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
          <AddressForm
            onSearchClicked={(address) => send("BTN_CLICKED", { address })}
          />
          {errorButton}

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ForecastList items={results}></ForecastList>
        )}
      </div>
    </>
  );
};

export default ForecastApp;