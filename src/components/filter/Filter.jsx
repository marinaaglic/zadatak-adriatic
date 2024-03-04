import { useState } from "react";
import "../../styles/filter.css";
import { useAccommodationContext } from "../../context/AccommodationContext";
import { amenityNames } from "../accomodation/Accommodation";

const initialAmenitiesState = {
  airConditioning: false,
  parkingSpace: false,
  pets: false,
  pool: false,
  wifi: false,
  tv: false,
};
export default function Filter({ onSearch }) {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
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
            <input
              type="date"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              min="2024-01-01"
              max="2024-12-31"
            />

            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              min="2024-01-01"
              max="2024-12-31"
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
            {Object.keys(amenityNames).map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  name={amenity}
                  checked={amenities[amenity]}
                  onChange={amenityChangeHandler}
                />
                {amenityNames[amenity]}
              </label>
            ))}
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
