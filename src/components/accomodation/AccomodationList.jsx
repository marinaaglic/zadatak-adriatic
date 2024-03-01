import { useState, useEffect } from "react";
import Accomodation from "./Accomodation";
import axios from "axios";
import "../../styles/accomodationList.css";

export default function AccomodationList() {
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    getAccomodations();
  }, []);

  async function getAccomodations() {
    try {
      const response = await axios.get(
        "https://api.adriatic.hr/test/accommodation"
      );

      setAccomodations(response.data);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    }
  }
  return (
    <div className="div-accomodation-list">
      <h3>Accomodations:</h3>
      <div className="accomodation-grid">
        {accomodations?.map((accomodation) => (
          <Accomodation key={accomodation.id} accomodation={accomodation} />
        ))}
      </div>
    </div>
  );
}
