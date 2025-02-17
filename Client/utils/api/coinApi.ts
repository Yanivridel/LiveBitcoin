import axios from "axios";
// import { API_KEY_COIN } from "@env";

export const fetchCoins = async () => {
    try {
        const response = await axios.post(
            "https://api.livecoinwatch.com/coins/list",
            {
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 50,
                meta: true
            }, 
            {
                headers: {
                    "x-api-key": "96dcd0a2-3e93-41dc-975d-094cf1121c7f"
                },
            }
        );

        console.log("Coins Data:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("API Request Error:", error);
    }
};
