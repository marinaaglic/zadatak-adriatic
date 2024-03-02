import { Route, Routes } from "react-router";
import AccommodationList from "../components/accomodation/AccommodationList";
import ReservationDetails from "../components/reservation/ReservationDetails";

export default function AppRoutes() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<AccommodationList />} />
        <Route path="/detalji-rezervacije" element={<ReservationDetails />} />
      </Routes>
    </div>
  );
}
