import { useState } from "react";
import "../../styles/accomodation.css";
import { useAccommodationContext } from "../../context/AccommodationContext";
import { useNavigate } from "react-router";
import { IoPeopleSharp } from "react-icons/io5";
import { FaTv, FaUmbrellaBeach } from "react-icons/fa6";
import { IoMdSnow } from "react-icons/io";
import { FaParking, FaWifi, FaSwimmingPool } from "react-icons/fa";
import { PiDog } from "react-icons/pi";
import moment from "moment";

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
    if (filterData.arrival && filterData.departure) {
      const start = new Date(filterData.arrival);
      const end = new Date(filterData.departure);
      const totalDays = (end - start) / (1000 * 60 * 60 * 24);
      let totalPrice = 0;

      for (let i = 0; i < pricelistInEuros.length; i++) {
        const priceStart = new Date(pricelistInEuros[i].intervalStart);
        priceStart.setHours(0, 0, 0, 0);
        const priceEnd = new Date(pricelistInEuros[i].intervalEnd);
        priceEnd.setHours(0, 0, 0, 0);
        if (start >= priceStart && end <= priceEnd) {
          totalPrice =
            filterData.numberOfPeople *
            totalDays *
            pricelistInEuros[i].pricePerNight;
          break;
        }
      }
      return totalPrice;
    }
    return null;
  }

  const totalPrice = calculateTotalPrice();

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
              {amenities.airConditioning ? (
                <span className="amenity">
                  <IoMdSnow /> Klimatizacija
                </span>
              ) : null}
              {amenities.parkingSpace ? (
                <span className="amenity">
                  <FaParking /> Parking mjesto
                </span>
              ) : null}
              {amenities.pets ? (
                <span className="amenity">
                  <PiDog /> Kućni ljubimci
                </span>
              ) : null}
              {amenities.pool ? (
                <span className="amenity">
                  <FaSwimmingPool /> Bazen
                </span>
              ) : null}
              {amenities.wifi ? (
                <span className="amenity">
                  <FaWifi /> Wi-Fi
                </span>
              ) : null}
              {amenities.tv ? (
                <span className="amenity">
                  <FaTv /> TV
                </span>
              ) : null}

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
