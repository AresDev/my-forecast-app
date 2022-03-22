import React from "react";
import './ForecastDetail.scss'
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
      <div className="detail-container">
        <p>
          <strong>{period.name}</strong>
        </p>
        <div className="info-container">
          <img src={period.icon} alt={period.shortForecast} />
          <div className="info">
            <p>
              <strong>
                <span className="temp">
                  {period.temperature}&deg;{period.temperatureUnit}
                </span>
              </strong>
            </p>
            <span>{period.windSpeed}</span>
            <span>{period.windDirection}</span>
          </div>
        </div>
        <p className="forecast">{period.shortForecast}</p>
      </div>
    );
}

export default ForecastDetail;