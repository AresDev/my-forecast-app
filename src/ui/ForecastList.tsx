import React from "react";
import ForecastDetail, { Period } from "./ForecastDetail";


export interface IProps {
  items: Period[];
}

const ForecastList = (props: IProps) => {
  const { items } = props;
  return (
    <div>
      {items.length > 0 ? (
        items.map((period) => (
          <ForecastDetail key={period.number} period={period} />
        ))
      ) : (
        <span>No results</span>
      )}
    </div>
  );
};

export default ForecastList;
