import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Country } from "../types/type";

export const CountryData: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [getCountries, setGetCountries] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countriesData: Country[] = response.data;
        setCountries(countriesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  const itemCountries = (country: Country) => {
    setGetCountries(country);
  };

  return (
    <div className="container">
      <div className="countries-list">
        <h2>Выберите страну</h2>
        <ul>
          {countries.map((country) => (
            <li
              className="country-list"
              key={country.name.common}
              onClick={() => itemCountries(country)}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      </div>
      <div className="country-info">
        {getCountries ? (
          <div>
            <h2>Информация о стране</h2>
            <h3>{getCountries.name?.common}</h3>
            <p>
              Столица:{" "}
              {getCountries.capital ? getCountries.capital : "Нет столицы"}
            </p>
            <p>Континент: {getCountries.region}</p>
            <p>Площадь: {getCountries.area} км²</p>
            <p>
              Граничит с:{" "}
              {getCountries.borders && getCountries.borders.length > 0
                ? getCountries.borders.join(", ")
                : "Ни с кем не граничит"}
            </p>
            {getCountries.flags && getCountries.flags.svg ? (
              <img
                src={getCountries.flags.svg}
                alt={getCountries.name.common}
              />
            ) : (
              <p>Нет флага для отображения</p>
            )}
          </div>
        ) : (
          <p>Страна не выбрана</p>
        )}
      </div>
    </div>
  );
};
