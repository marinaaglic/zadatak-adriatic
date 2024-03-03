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

export const totalPrice = calculateTotalPrice();