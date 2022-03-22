import React from "react";
import ForecastDetail, { Period } from "../ForecastDetail/ForecastDetail";
import Loading from "../Loading/Loading";
import NoResults from "../NoResults/NoResults";
import './ForecastList.scss';

export interface IProps {
  items: Period[];
  loading:boolean;
}

const ForecastList = (props: IProps) => {
  const { items, loading } = props;
  return (
    <div className="list-container">
      {loading ? (
        <Loading/>
      ) : (

      items.length > 0 ? (
        items.map((period) => (
          <ForecastDetail key={period.number} period={period} />
        ))
      ) : (
        <NoResults />
      ))}
    </div>
  );
};

export default ForecastList;
