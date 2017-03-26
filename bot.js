const poloniex = require('@you21979/poloniex.com')
const task = require('promise-util-task')
const sleep = require('@you21979/promise-sleep');
const errors = require('@you21979/poloniex.com/errors');

const depth = (info, pair) => info.orderBook(pair).then( res => ({ asks : res.asks, bids : res.bids, }) )

const log = console.log
const e = (promise) => promise

const initialize = () => {
    poloniex.Constant.OPT_KEEPALIVE = true
    poloniex.Constant.OPT_TIMEOUT_SEC = 30
}


const getTradeSize = (min, max, digit) => {
    const amount = parseFloat(((Math.random() * (max - min)) + min).toFixed(digit));
    return amount
}

const mainloop = async (ms) => {
    try{
        const price = await depth(poloniex.PublicApi, ms.pair).then(book => book.asks[2][0])
        if(await ms.watch(price)){
        }else{
console.log("wait");
        }
    }catch(e){
        log(e.message);
    }
}

class MainSystem{
    constructor(option){
        this.pair = option.pair
        this.digit = 8
    }
    watch(price){
        console.log(price)
        return false
    }
}


const main = async () => {
    initialize();
    log('trading system start ....');
    const ms = new MainSystem({
        pair : 'BTC_DASH',
    });
    for(;;){
        await mainloop(ms)
    }
}

main()
