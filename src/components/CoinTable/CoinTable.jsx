import { useContext, useState } from "react";
import fetchCoinData from "../services/fetchCoinData";
import { useQuery } from "react-query";
import { CurrencyContext } from "../../context/CurrencyContext";

function CoinTable() {

    const { currency } = useContext(CurrencyContext);

    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error } = useQuery(['coins',page, currency], () => fetchCoinData(page, currency), {
        // retry: 2,
        // retryDelay: 1000,
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    });

    if(isError){
        return <div> Error: {error.message} </div> ;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5 my-5 w-[80vw] mx-auto">
            <div className="flex items-center justify-center w-full px-2 py-4 font-semibold text-black bg-yellow-400">
                {/* Hear of the Table */}
                <div className="basis-[35%]">
                    Coin
                </div>
                <div className="basis-[25%]">
                    Price in {currency.toUpperCase()}
                </div>
                <div className="basis-[20%]">
                    24H Change
                </div>
                <div className="basis-[20%]">
                    Marker Cap
                </div>
            </div>

            <div className="flex flex-col w-[80vw] mx-auto">
                {isLoading && <div> Loading... </div>}
                {data && data.map((coin) => {
                    return(
                        <div key={coin.id} className="flex items-center justify-between w-full px-2 py-4 font-semibold text-white bg-transparent">
                            <div className="flex items-center gap-3 justify-start basis-[35%]">

                                <div className="w-[5rem] h-[5rem]">
                                    <img src={coin.image} className="w-full h-full" />
                                </div>

                                <div className="flex flex-col">
                                    <div className="text-3xl"> {coin.name} </div>
                                    <div className="text-xl"> {coin.symbol} </div>
                                </div>


                            </div>

                            <div className="basis-[25%]">
                                {coin.current_price}
                            </div>
                            <div className="basis-[20%]">
                                {coin.price_change_24h}
                            </div>
                            <div className="basis-[20%]">
                                {coin.market_cap}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-center gap-4">
                <button
                disabled = {page === 1}
                    onClick={() => setPage(page - 1)}
                    className="text-2xl text-white btn btn-primary btn-wide"
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="text-2xl text-white btn btn-secondary btn-wide"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CoinTable;