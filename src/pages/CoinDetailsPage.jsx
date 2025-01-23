import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "../components/services/fetchCoinDetails";
import parse from "html-react-parser";
import currencyStore from "../state/store";
import { Facebook } from "react-content-loader";
import CoinInfoContainer from "../components/CoinInfo/CoinInfoContainer";

function CoinDetailsPage(){

    const { currency } = currencyStore();

    const { coinId } = useParams();

    const {isError, isLoading, data: coin} = useQuery(["coin", coinId], () => fetchCoinDetails(coinId), {
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    });

    if(isLoading){
        return <Facebook />
    }

    if(isError){
        return <div>Error: Something Went Wrong</div>
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div
                className="md:w-1/3 w-full flex flex-col items-center mt=6 md:mt-0 border-r-2 border-gray-500"
            >
                <img
                    alt={coin?.name}
                    src={coin?.image?.large}
                    className="h-52 mb-5"
                />

                <h1
                    className="text-4xl font-bold mb-5"
                >
                    {coin?.name} ({coin?.symbol.toUpperCase()})
                </h1>

                <p
                    className="w-full px-6 py-4 text-justify"
                >
                    {parse(coin?.description.en)}
                </p>

                <div
                    className="w-full flex flex-col md:flex-row md:justify-around"
                >
                    <div
                        className="flex items-center mb-4 md:mb-0"
                    >
                        <h2 className="text-xl font-bold">
                            Rank
                        </h2>

                        <span className="ml-3 text-xl">
                            {coin?.market_cap_rank}
                        </span>
                    </div>

                    <div
                        className="flex items-center mb-4 md:mb-0"
                    >
                        <h2 className="text-xl text-yellow-400 font-bold">
                            Current Price in ({currency.toUpperCase()})
                        </h2>

                        <span className="ml-3 text-xl">
                            {coin?.market_data.current_price[currency]}
                        </span>
                    </div>

                </div>

            </div>

            <div className="md:x-2/3 w-full">
                <CoinInfoContainer coinId={coinId} />
            </div>

        </div>
    );
}

export default CoinDetailsPage;