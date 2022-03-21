import React from "react";

export interface IProps{
    period: Period
}

export interface Period {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: false;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

const ForecastDetail = (props:IProps)=>{
    const { period } = props;
    return (
      <div>
        <p>{period.name}</p>
        <p>
          {period.temperature}&deg;{period.temperatureUnit}
        </p>
        <p>{period.windSpeed}</p>
        <p>{period.windDirection}</p>
        <p>{period.shortForecast}</p>
        <img src={period.icon} alt={period.shortForecast} />
      </div>
    );
}

export default ForecastDetail;