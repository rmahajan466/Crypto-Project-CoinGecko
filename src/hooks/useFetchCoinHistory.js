import { useState } from "react";
import currencyStore from "../state/store";
import { useQuery } from "react-query";
import { fetchCoinHistoricData } from "../components/services/fetchCoinHistoricData";

function useFetchCoinHistory(coinId) {
    const { currency } = currencyStore();

    const [days, setDays] = useState(7);

    const [interval, setCoinInterval] = useState('');

    const { data: historicData, isLoading, isError } = useQuery(['coinHistoryData', coinId, currency, days, interval],
        () => fetchCoinHistoricData(coinId, interval, days, currency), {
            cacheTime: 1000 * 60 * 2,
            staleTime: 1000 * 60 * 2,
        });

        return {
            historicData,
            isLoading,
            isError,
            setDays,
            setCoinInterval,
            days,
            currency
        };
}

export default useFetchCoinHistory;