export function fromIlsToCoin(sum,type,rate){
        console.log("fromIlsToCoin called with:", { sum, type, rate });

    return type=="SHEKEL"?sum:sum/rate;
}
export function fromCoinToShekel(sum,type,rate){
    return type=="SHEKEL"?sum:sum*rate;
}