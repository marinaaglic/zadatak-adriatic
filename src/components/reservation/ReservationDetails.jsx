import { Link } from "react-router-dom";
import "../../styles/reservationDetails.css";

export default function ReservationDetails() {
  return (
    <div className="reservation-content">
      <div className="div-reservation-details">
        <h3>USPJEŠNO STE REZERVIRALI BORAVAK!</h3>
        <h4>Detalji rezervacije</h4>
        <p>Naziv smještaja:</p>
        <p>Termin boravka:</p>
        <p>Broj osoba:</p>
        <p>Ukupna cijena boravka:</p>
        <Link to="/" className="link-back">
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
