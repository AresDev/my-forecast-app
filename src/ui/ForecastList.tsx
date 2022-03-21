import React from "react";
import ForecastDetail, { Period } from "./ForecastDetail";


export interface IProps {
  items: Period[];
}

const ForecastList = (props: IProps) => {
  const { items } = props;
  return (
    <div>
   { items.map((period)=> <ForecastDetail key={period.number} period={period}/>)}
    </div>
  );
};

export default ForecastList;
