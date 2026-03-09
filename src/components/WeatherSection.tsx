import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherServices";

import "./WeatherSection.css";

const WeatherSection = () => {
  const [dailyWeather, setDailyWeather] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather();

      const daily = data.list.filter(
        (item: any, index: number) => index % 8 === 0
      );

      setDailyWeather(daily);
    };

    fetchWeather();
  }, []);

  return (
    <>
      <h2 className="section-title">สภาพอากาศ 5 วัน</h2>

      <div className="weather-scroll">
        {dailyWeather.map((day, index) => (
          <div className="weather-item" key={index}>
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="weather"
            />

            <p className="temp">{Math.round(day.main.temp)}°C</p>
            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherSection;