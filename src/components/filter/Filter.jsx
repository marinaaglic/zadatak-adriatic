import { useState } from "react";
import "../../styles/filter.css";

export default function Filter({ onSearch }) {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [amenities, setAmenities] = useState({
    airConditioning: false,
    parkingSpace: false,
    pets: false,
    pool: false,
    wifi: false,
    tv: false,
  });
  const searchHandler = () => {
    onSearch({ arrival, departure, numberOfPeople, amenities });
  };
  const amenityChangeHandler = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
    });
  };
  const resetHandler = () => {
    setArrival("");
    setDeparture("");
    setNumberOfPeople(0);
    setAmenities({
      airConditioning: false,
      parkingSpace: false,
      pets: false,
      pool: false,
      wifi: false,
      tv: false,
    });
  };
  return (
    <div className="filter-content">
      <h2>Filtriraj prema:</h2>
      <div className="div-filter">
        <div className="div-dates">
          <input
            type="date"
            name="arrival"
            placeholder="Dolazak"
            min="2024-01-01"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
          <input
            type="date"
            name="departure"
            placeholder="Odlazak"
            max="2024-12-31"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </div>
        <div className="div-input">
          <label name="numberOfPeople">Broj osoba:</label>
          <input
            type="number"
            name="numberOfPeople"
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
        </div>
        <div className="div-amenities-filter">
          <label>Dodatne usluge:</label>
          <label>
            <input
              type="checkbox"
              name="airConditioning"
              checked={amenities.airConditioning}
              onChange={amenityChangeHandler}
            />
            Klima uređaj
          </label>
          <label>
            <input
              type="checkbox"
              name="parkingSpace"
              checked={amenities.parkingSpace}
              onChange={amenityChangeHandler}
            />
            Parking mjesto
          </label>
          <label>
            <input
              type="checkbox"
              name="pets"
              checked={amenities.pets}
              onChange={amenityChangeHandler}
            />
            Kućni Ljubimci
          </label>
          <label>
            <input
              type="checkbox"
              name="pool"
              checked={amenities.pool}
              onChange={amenityChangeHandler}
            />
            Bazen
          </label>
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={amenities.wifi}
              onChange={amenityChangeHandler}
            />
            Wi-Fi
          </label>
          <label>
            <input
              type="checkbox"
              name="tv"
              checked={amenities.tv}
              onChange={amenityChangeHandler}
            />
            TV
          </label>
        </div>
      </div>
      <button type="button" className="btn-search" onClick={searchHandler}>
        Pretraži
      </button>
      <button type="button" className="btn-clear" onClick={resetHandler}>
        Očisti
      </button>
    </div>
  );
}
