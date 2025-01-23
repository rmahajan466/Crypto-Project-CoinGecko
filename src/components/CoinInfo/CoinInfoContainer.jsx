import { useQuery } from "react-query";
import CoinInfo from "./CoinInfo";
import currencyStore from "../../state/store";
import { useState } from "react";
import { Facebook } from "react-content-loader";
import Alert from "../Alert/Alert";
import { fetchCoinHistoricData } from "../services/fetchCoinHistoricData";

function CoinInfoContainer({ coinId }) {

    const { currency } = currencyStore();

    const [days, setDays] = useState(7);

    const [interval, setCoinInterval] = useState('');

    const { data: historicData, isLoading, isError } = useQuery(['coinHistoryData', coinId, currency, days, interval],
        () => fetchCoinHistoricData(coinId, interval, days, currency), {
            cacheTime: 1000 * 60 * 2,
            staleTime: 1000 * 60 * 2,
        });

    if (isLoading) {
        return(
            <Facebook />
        );
    }

    if (isError) {
        return(
            <Alert message="Error Fetching Data" type="error" />
        );
    }

    return (
        <>
            <CoinInfo
                historicData = {historicData}
                setDays={setDays}
                setCoinInterval={setCoinInterval}
                days={days}
                currency={currency}
            />
        </>
    );
}

export default CoinInfoContainer;