import { useState } from "react";
import "../../styles/filter.css";
import { useAccommodationContext } from "../../context/AccommodationContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialAmenitiesState = {
  airConditioning: false,
  parkingSpace: false,
  pets: false,
  pool: false,
  wifi: false,
  tv: false,
};
export default function Filter({ onSearch }) {
  const [arrival, setArrival] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [amenities, setAmenities] = useState(initialAmenitiesState);
  const { setFilterData } = useAccommodationContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const searchHandler = () => {
    onSearch({ arrival, departure, numberOfPeople, amenities });
    setFilterData({ arrival, departure, numberOfPeople });
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
    setAmenities(initialAmenitiesState);
  };
  return (
    <div className="filter-content">
      <button className="btn-filter" onClick={toggleForm}>
        Filtriraj
      </button>
      <span className={`filter-content ${isFormOpen ? "open" : "closed"}`}>
        <h2>Filtriraj prema:</h2>
        <div className="div-filter">
          <div className="div-dates">
            <DatePicker
              placeholderText="Dolazak"
              selected={arrival}
              name="arrival"
              value={arrival}
              minDate={new Date("2024-01-01")}
              maxDate={new Date("2024-12-31")}
              onChange={(date) => setArrival(date)}
            />
            <DatePicker
              placeholderText="Odlazak"
              selected={departure}
              name="departure"
              value={departure}
              minDate={new Date("2024-01-01")}
              maxDate={new Date("2024-12-31")}
              onChange={(date) => setDeparture(date)}
            />
          </div>
          <div className="div-input">
            <label name="numberOfPeople">Broj osoba:</label>
            <input
              type="number"
              name="numberOfPeople"
              value={numberOfPeople}
              min={1}
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
      </span>
    </div>
  );
}
