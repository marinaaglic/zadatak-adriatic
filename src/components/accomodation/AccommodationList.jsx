import { useState, useEffect } from "react";
import Accommodation from "./Accommodation";
import axios from "axios";
import Filter from "../filter/Filter";

import "../../styles/accomodationList.css";

export default function AccomodationList() {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  useEffect(() => {
    getAccomodations();
  }, []);

  async function getAccomodations() {
    try {
      const response = await axios.get(
        "https://api.adriatic.hr/test/accommodation"
      );

      setAccommodations(response.data);
      setFilteredAccommodations(response.data);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  }

  const searchHandler = (filters) => {
    let filtered = accommodations;

    if (filters.arrival && filters.departure) {
      filtered = filtered.filter((accommodation) =>
        accommodation.availableDates.some(
          (date) =>
            date.intervalStart <= filters.departure &&
            date.intervalEnd >= filters.arrival
        )
      );
    }

    if (filters.numberOfPeople) {
      filtered = filtered.filter(
        (accommodation) =>
          accommodation.capacity === Number(filters.numberOfPeople)
      );
    }

    for (const amenity in filters.amenities) {
      if (filters.amenities[amenity]) {
        filtered = filtered.filter(
          (accommodation) => accommodation.amenities[amenity]
        );
      }
    }

    setFilteredAccommodations(filtered);
  };

  return (
    <div className="div-accommodation-list">
      <Filter onSearch={searchHandler} />
      <h3>Accomodations:</h3>
      <div className="accommodation-grid">
        {filteredAccommodations.length > 0 ? (
          filteredAccommodations.map((accommodation) => (
            <Accommodation
              key={accommodation.id}
              accommodation={accommodation}
            />
          ))
        ) : (
          <p className="message">
            Nema smještaja koji odgovara vašim kriterijima.
          </p>
        )}
      </div>
    </div>
  );
}
