import { useMachine } from "@xstate/react";
import React from "react";
import forecastMachine from "../state/main";
import ForecastList from "../ui/ForecastList";
import AddressForm from "./AddressForm";

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
        <label>Please enter the address</label>
        <AddressForm
          onSearchClicked={(address) => send("BTN_CLICKED", { address })}
        />
        {errorButton}
      </div>
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