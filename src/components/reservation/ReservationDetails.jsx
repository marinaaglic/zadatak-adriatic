import { Link } from "react-router-dom";
import "../../styles/reservationDetails.css";
import { useAccommodationContext } from "../../context/AccommodationContext";

export default function ReservationDetails() {
  const { reservationDetails } = useAccommodationContext();
  return (
    <div className="reservation-content">
      <div className="div-reservation-details">
        <h3>
          USPJEŠNO STE REZERVIRALI SMJEŠTAJ:
          {reservationDetails.accommodationName}
        </h3>
        <h4>Detalji rezervacije</h4>

        <p>Termin boravka: {reservationDetails.stayPeriod}</p>
        <p>
          Broj osoba:{" "}
          {reservationDetails.numberOfPeople === 0
            ? "Nije određeno"
            : reservationDetails.numberOfPeople}
        </p>
        <p>Ukupna cijena boravka: {reservationDetails.totalPrice} €</p>
        <Link to="/" className="link-back">
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
