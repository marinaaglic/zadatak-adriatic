import { Route, Routes } from "react-router";
import AccomodationList from "../components/accomodation/AccomodationList";
import ReservationDetails from "../components/reservation/ReservationDetails";

export default function AppRoutes() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<AccomodationList />} />
        <Route path="/detalji-rezervacije" element={<ReservationDetails />} />
      </Routes>
    </div>
  );
}
