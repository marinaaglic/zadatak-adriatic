import { useState } from "react";
import "../../styles/accomodation.css";
import { useAccommodationContext } from "../../context/AccommodationContext";
import { useNavigate } from "react-router";

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const { setReservationDetails } = useAccommodationContext();
  const navigate = useNavigate();

  function calculateTotalPrice() {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const totalDays = (end - start) / (1000 * 60 * 60 * 24);
      let totalPrice = 0;

      for (let i = 0; i < pricelistInEuros.length; i++) {
        const priceStart = new Date(pricelistInEuros[i].intervalStart);
        const priceEnd = new Date(pricelistInEuros[i].intervalEnd);
        if (start >= priceStart && end <= priceEnd) {
          totalPrice =
            numberOfPeople * totalDays * pricelistInEuros[i].pricePerNight;
          break;
        }
      }
      return totalPrice;
    }
    return null;
  }
  const totalPrice = calculateTotalPrice();

  const reservationHandler = () => {
    setReservationDetails({
      accommodationName: title,
      stayPeriod: `${startDate} - ${endDate}`,
      numberOfPeople: numberOfPeople,
      totalPrice: totalPrice,
    });
    navigate("/detalji-rezervacije");
  };

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

        {showDetails && (
          <div className="div-amenities">
            <div className="div-amenities-price">
              <div>
                <h4>Dodatne usluge:</h4>
                <ul>
                  <li>
                    Klima uređaj: {amenities.airConditioning ? "Da" : "Ne"}
                  </li>
                  <li>
                    Parking mjesto: {amenities.parkingSpace ? "Da" : "Ne"}
                  </li>
                  <li>Kućni ljubimci: {amenities.pets ? "Da" : "Ne"}</li>
                  <li>Bazen: {amenities.pool ? "Da" : "Ne"}</li>
                  <li>Wi-fi: {amenities.wifi ? "Da" : "Ne"}</li>
                  <li>TV: {amenities.tv ? "Da" : "Ne"}</li>
                </ul>
              </div>
              <div>
                <h4>Cijena:</h4>
                <ul>
                  {pricelistInEuros.map((price, index) => {
                    const startDate = new Date(price.intervalStart);
                    const endDate = new Date(price.intervalEnd);
                    const formattedStartDate = `${startDate.getDate()}.${
                      startDate.getMonth() + 1
                    }.`;
                    const formattedEndDate = `${endDate.getDate()}.${
                      endDate.getMonth() + 1
                    }.`;

                    return (
                      <li key={index}>
                        {formattedStartDate} - {formattedEndDate}:{" "}
                        {price.pricePerNight}€
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="div-rez">
              <input
                type="date"
                className="input-date"
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                type="date"
                className="input-date"
                onChange={(e) => setEndDate(e.target.value)}
              />
              <input
                type="number"
                placeholder="Broj osoba"
                onChange={(e) => setNumberOfPeople(e.target.value)}
              />
              {totalPrice ? (
                <>
                  <p>Ukupna cijena za odabrane datume: {totalPrice}€</p>
                  <button
                    className="link-reservation"
                    onClick={reservationHandler}
                  >
                    Rezerviraj
                  </button>
                </>
              ) : (
                <p>
                  Molimo odaberite datume boravka da biste vidjeli točnu cijenu
                  i mogli rezervirati smještaj.
                </p>
              )}
            </div>
          </div>
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
      </div>
    </div>
  );
}
