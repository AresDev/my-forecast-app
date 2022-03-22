import React from "react";
import ForecastDetail, { Period } from "../ForecastDetail/ForecastDetail";
import './ForecastList.scss';

export interface IProps {
  items: Period[];
}

const ForecastList = (props: IProps) => {
  const { items } = props;
  return (
    <div className="list-container">
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
