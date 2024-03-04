import { useState } from "react";
import "../../styles/accomodation.css";
import { useAccommodationContext } from "../../context/AccommodationContext";
import { useNavigate } from "react-router";
import { IoPeopleSharp } from "react-icons/io5";
import { FaUmbrellaBeach } from "react-icons/fa6";
import calculateTotalPrice from "../../utils/functions";
import moment from "moment";

export const amenityNames = {
  airConditioning: "Klimatizacija",
  parkingSpace: "Parking",
  pets: "Ljubimci",
  pool: "Bazen",
  wifi: "Wi-Fi",
  tv: "TV",
};
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
  const { filterData, setReservationDetails } = useAccommodationContext();
  const navigate = useNavigate();

  const pricesPerNight = pricelistInEuros.map((price) => price.pricePerNight);
  let minPrice = Math.min(...pricesPerNight);
  let maxPrice = Math.max(...pricesPerNight);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth() + 1}.`;
  };

  const totalPrice = calculateTotalPrice(filterData, pricelistInEuros);

  const reservationHandler = () => {
    const formattedArrival = moment(filterData.arrival).format("DD/MM/YYYY");
    const formattedDeparture = moment(filterData.departure).format(
      "DD/MM/YYYY"
    );
    setReservationDetails({
      accommodationName: title,
      stayPeriod: `${formattedArrival} - ${formattedDeparture}`,
      numberOfPeople: filterData.numberOfPeople,
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
        <p>
          {capacity} <IoPeopleSharp />
        </p>
        {beachDistanceInMeters && (
          <p>
            {beachDistanceInMeters}m <FaUmbrellaBeach />
          </p>
        )}
        {showDetails && (
          <div className="div-amenities-price">
            <div className="div-amenities">
              {Object.keys(amenities).map((key) =>
                amenities[key] ? (
                  <span key={key} className="amenity">
                    {amenityNames[key]}
                  </span>
                ) : null
              )}
              <table className="table-price">
                <thead>
                  <tr>
                    <th>Datumi</th>
                    <th>Cijena po noći (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {pricelistInEuros.map((price, index) => {
                    const formattedStartDate = formatDate(price.intervalStart);
                    const formattedEndDate = formatDate(price.intervalEnd);
                    const interval = `${formattedStartDate} - ${formattedEndDate}`;

                    return (
                      <tr key={index}>
                        <td>{interval}</td>
                        <td>{price.pricePerNight}€</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
                  Raspon cijena {minPrice}-{maxPrice}€. Molimo odaberite datume
                  boravka da biste vidjeli točnu cijenu i mogli rezervirati
                  smještaj.
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
          {showDetails ? "Prikaži manje" : "Prikaži više"}
        </button>
      </div>
    </div>
  );
}
