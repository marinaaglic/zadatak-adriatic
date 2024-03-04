import axios from "axios";

export async function fetchData() {
    try {
        const response = await axios.get("https://api.adriatic.hr/test/accommodation");
        return response.data;
    } catch (error) {
        console.error("Error fetching accommodations:", error);
        return [];
    }
}