import { useState } from "react";
import "../../styles/accomodation.css";

export default function Accommodation({ accommodation }) {
  const {
    title,
    image,
    capacity,
    beachDistanceInMeters,
    amenities,
    pricelistInEuros,
  } = accommodation;
  const [showDetails, setShowDetails] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`div-accommodation ${expanded ? "expanded" : ""}`}>
      <div className="div-info">
        <h4>{title}</h4>
        <img src={image} />
      </div>
      <div className="div-details">
        <p>Broj osoba: {capacity}</p>
        {beachDistanceInMeters && (
          <p>Udaljenost od plaže u metrima: {beachDistanceInMeters}m</p>
        )}
        <button
          className="btn-show-more"
          onClick={() => {
            setShowDetails(!showDetails);
            setExpanded(!expanded);
          }}
        >
          {showDetails ? "Sakrij" : "Prikaži više"}
        </button>
        {showDetails && (
          <div className="div-amenities">
            <div>
              <h4>Dodatne usluge:</h4>
              <ul>
                <li>Klima uređaj: {amenities.airConditioning ? "Da" : "Ne"}</li>
                <li>Parking mjesto: {amenities.parkingSpace ? "Da" : "Ne"}</li>
                <li>Kućni ljubimci: {amenities.pets ? "Da" : "Ne"}</li>
                <li>Bazen: {amenities.pool ? "Da" : "Ne"}</li>
                <li>Wi-fi: {amenities.wifi ? "Da" : "Ne"}</li>
                <li>TV: {amenities.tv ? "Da" : "Ne"}</li>
              </ul>
            </div>
            <div>
              <h4>Cijena:</h4>
              <ul>
                {pricelistInEuros.map((price, index) => (
                  <li key={index}>
                    {price.intervalStart} - {price.intervalEnd}:{" "}
                    {price.pricePerNight}€
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
