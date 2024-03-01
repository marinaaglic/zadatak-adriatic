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
  const handleSearch = () => {
    onSearch({ arrival, departure, numberOfPeople, amenities });
  };
  const handleAmenityChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
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
              onChange={handleAmenityChange}
            />
            Klima uređaj
          </label>
          <label>
            <input
              type="checkbox"
              name="parkingSpace"
              checked={amenities.parkingSpace}
              onChange={handleAmenityChange}
            />
            Parking mjesto
          </label>
          <label>
            <input
              type="checkbox"
              name="pets"
              checked={amenities.pets}
              onChange={handleAmenityChange}
            />
            Kućni Ljubimci
          </label>
          <label>
            <input
              type="checkbox"
              name="pool"
              checked={amenities.pool}
              onChange={handleAmenityChange}
            />
            Bazen
          </label>
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={amenities.wifi}
              onChange={handleAmenityChange}
            />
            Wi-Fi
          </label>
          <label>
            <input
              type="checkbox"
              name="tv"
              checked={amenities.tv}
              onChange={handleAmenityChange}
            />
            TV
          </label>
        </div>
      </div>
      <button type="button" className="btn-search" onClick={handleSearch}>
        Pretraži
      </button>
      <button type="button" className="btn-clear">
        Očisti
      </button>
    </div>
  );
}
