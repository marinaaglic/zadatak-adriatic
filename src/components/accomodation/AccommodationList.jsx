import { useState, useEffect } from "react";
import Accommodation from "./Accommodation";
import Filter from "../filter/Filter";
import "../../styles/accomodationList.css";
import { fetchData } from "../../utils/api/api";
import { searchAccommodations } from "../../utils/functions/index";

export default function AccomodationList() {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAccommodations() {
      const data = await fetchData();
      setAccommodations(data);
      setFilteredAccommodations(data);
      setLoading(false);
    }
    getAccommodations();
  }, []);

  function handleSearch(filters) {
    const filtered = searchAccommodations(accommodations, filters);
    setFilteredAccommodations(filtered);
  }

  if (loading) {
    return <div>Učitavanje...</div>;
  }
  return (
    <div className="div-accommodation-list">
      <Filter onSearch={handleSearch} />
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
