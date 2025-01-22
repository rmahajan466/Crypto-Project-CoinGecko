import axiosInstance from "../../helpers/axiosInstance";

export async function fetchCoinDetails() {

    try {
        const response = await axiosInstance.get(`/coins/${Id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}