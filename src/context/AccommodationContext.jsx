import React, { createContext, useContext, useState } from "react";

const AccommodationContext = createContext();

export const AccommodationProvider = ({ children }) => {
  const [reservationDetails, setReservationDetails] = useState({
    accommodationName: "",
    stayPeriod: "",
    numberOfPeople: 0,
    totalPrice: 0,
  });
  const [filterData, setFilterData] = useState({
    arrival: "",
    departure: "",
    numberOfPeople: 0,
  });

  return (
    <AccommodationContext.Provider
      value={{
        reservationDetails,
        setReservationDetails,
        filterData,
        setFilterData,
      }}
    >
      {children}
    </AccommodationContext.Provider>
  );
};

export const useAccommodationContext = () => useContext(AccommodationContext);
