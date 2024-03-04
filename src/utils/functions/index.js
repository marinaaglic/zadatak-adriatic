export default function calculateTotalPrice(filterData, pricelistInEuros) {
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
                    totalDays *
                    pricelistInEuros[i].pricePerNight;
                break;
            }
        }
        return totalPrice;
    }
    return null;
}

export function searchAccommodations(accommodations, filters) {
    let filtered = accommodations;

    if (filters.arrival && filters.departure) {
        const arrivalDate = new Date(filters.arrival);
        const departureDate = new Date(filters.departure);
        filtered = filtered.filter((accommodation) =>
            accommodation.availableDates.some(
                (date) =>
                    new Date(date.intervalStart) <= departureDate &&
                    new Date(date.intervalEnd) >= arrivalDate
            )
        );
    }
    if (filters.numberOfPeople) {
        filtered = filtered.filter(
            (accommodation) => accommodation.capacity >= filters.numberOfPeople
        );
    }
    for (const amenity in filters.amenities) {
        if (filters.amenities[amenity]) {
            filtered = filtered.filter(
                (accommodation) => accommodation.amenities[amenity]
            );
        }
    }
    return filtered;
}

