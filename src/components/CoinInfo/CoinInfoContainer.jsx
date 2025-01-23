import CoinInfo from "./CoinInfo";
import { Facebook } from "react-content-loader";
import Alert from "../Alert/Alert";
import useFetchCoinHistory from "../../hooks/useFetchCoinHistory";

function CoinInfoContainer({ coinId }) {

    const { historicData, isError, isLoading, currency, days, setDays, setCoinInterval } = useFetchCoinHistory(coinId);

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