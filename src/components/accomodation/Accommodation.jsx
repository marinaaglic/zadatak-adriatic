import { useState } from "react";
import "../../styles/accomodation.css";
import { useAccommodationContext } from "../../context/AccommodationContext";
import { useNavigate } from "react-router";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTv, FaUmbrellaBeach } from "react-icons/fa6";
import { IoMdSnow } from "react-icons/io";
import { FaParking, FaWifi, FaSwimmingPool } from "react-icons/fa";
import { PiDog } from "react-icons/pi";

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

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  pricelistInEuros.forEach((price) => {
    if (price.pricePerNight < minPrice) {
      minPrice = price.pricePerNight;
    }
    if (price.pricePerNight > maxPrice) {
      maxPrice = price.pricePerNight;
    }
  });

  function calculateTotalPrice() {
    if (!filterData.arrival || !filterData.departure) return null;

    const start = new Date(filterData.arrival);
    const end = new Date(filterData.departure);
    const totalDays = (end - start) / (1000 * 60 * 60 * 24);

    for (const price of pricelistInEuros) {
      const priceStart = new Date(price.intervalStart);
      const priceEnd = new Date(price.intervalEnd);

      if (start >= priceStart && end <= priceEnd) {
        return filterData.numberOfPeople * totalDays * price.pricePerNight;
      }
    }
    return null;
  }
  const totalPrice = calculateTotalPrice();

  const reservationHandler = () => {
    setReservationDetails({
      accommodationName: title,
      stayPeriod: `${filterData.arrival} - ${filterData.departure}`,
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
              <h4>Dodatne usluge:</h4>
              <span>{amenities.airConditioning ? <IoMdSnow /> : null}</span>
              <span>{amenities.parkingSpace ? <FaParking /> : null}</span>
              <span>{amenities.pets ? <PiDog /> : null}</span>
              <span> {amenities.pool ? <FaSwimmingPool /> : null}</span>
              <span> {amenities.wifi ? <FaWifi /> : null}</span>
              <span> {amenities.tv ? <FaTv /> : null}</span>
              <table className="table-price">
                <thead>
                  <tr>
                    <th>Datumi</th>
                    <th>Cijena po noći (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {pricelistInEuros.map((price, index) => {
                    const startDate = new Date(price.intervalStart);
                    const endDate = new Date(price.intervalEnd);
                    const formattedStartDate = `${startDate.getDate()}.${
                      startDate.getMonth() + 1
                    }.`;
                    const formattedEndDate = `${endDate.getDate()}.${
                      endDate.getMonth() + 1
                    }.`;
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
