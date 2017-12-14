var request = require('request');
var json2csv = require('json2csv');
var fs = require('fs');

// All Coins in Bittrex
coins = ['XEM', 'LTC', 'ETH', 'BCC', 'NXT', 'EMC2', 'ETC', 'ADA', 'XLM', 'STRAT', 'XRP', 'NEO', 'VTC', 'TIX', 'POWR', 'WAVES', 'MCO', 'THC', 'DASH', 'OMG', 'IOP', 'BTG', 'XMR', 'MONA', 'ZEC', 'SAFEX', 'SBD', 'GRS', 'QTUM', 'LSK', 'VOX', 'SALT', 'GUP', 'PAY', 'AGRS', 'SNT', 'ARDR', 'ARK', 'ADX', 'KMD', 'XZC', 'MANA', 'SYS', 'SC', 'XVG', 'POT', 'OK', 'RCN', 'DGB', 'NAV', 'STEEM', 'TRST', 'EDG', 'MTL', 'GNT', 'PIVX', 'TRIG', 'MER', 'DOPE', 'RISE', 'CVC', 'UNB', 'STORJ', 'GAME', 'BAY', 'DCR', 'XAUR', 'GBYTE', 'BAT', 'CANN', 'DOGE', 'ZEN', 'SLR', 'GCR', 'CLUB', 'TX', 'NMR', 'REP', 'MYST', 'MAID', 'FCT', 'ENG', 'DNT', 'PTOY', 'SNGLS', 'NXS', 'CFI', 'QRL', 'FUN', 'RADS', 'LMC', 'CLOAK', 'FLDC', 'RDD', 'LBC', 'VIA', 'BLK', 'EBST', '1ST', 'EGC', 'AMP', 'DCT', 'MUE', 'VTR', 'MEME', 'START', 'PART', 'BNT', 'PPC', 'XCP', 'NXC', 'FTC', 'XEL', 'BITB', 'UBQ', 'AEON', 'TIME', 'VIB', 'NBT', 'WINGS', 'ANT', 'PINK', 'TKN', 'EXP', 'SIB', 'FLO', 'SPHR', 'HMQ', 'KORE', 'SHIFT', 'VRC', 'ENRG', 'RLC', 'DYN', 'GNO', 'BLOCK', 'IOC', 'BURST', 'SYNX', 'DGD', 'MUSIC', 'XWC', 'SLS', 'EXCL', 'DMD', 'OMNI', 'PKB', 'XVC', 'BSD', 'BTCD', 'XST', 'NEOS', 'COVAL', 'ZCL', 'AUR', 'SPR', 'XMG', 'FAIR', 'ADT', 'ION', 'ABY', 'CRB', 'DTB', 'LGD', 'QWARK', 'TKS', 'SWT', 'GBG', 'NLG', 'GRC', 'LUN', 'VRM', 'XMY', 'CRW', 'EMC', 'MLN', 'SWIFT', 'ERC', 'XDN', 'TRUST', 'GOLOS', 'CURE', 'RBY', 'CLAM', 'BRX', 'GLD', 'PTC', 'GEO', 'CPC', '2GIVE', 'BCY', 'INCNT', 'INFX', 'BYC', 'BLITZ', 'GAM', 'PDC', 'BRK', 'APX', 'SNRG', 'SEQ', 'EFL']

var csv = {}
var fields = ['O','H', 'L','C','V','T','BV'];

function getAPI(urls, coin_name){

    request(urls, function (error, response, body) {
        if (error) return done(error);
        var coin_data = JSON.parse(body);
        coin_data = coin_data['result'];
        //console.log(coin_data);
        csv = json2csv({data: coin_data, fields: fields});
        var coin_file = coin_name + '.csv';
        fs.writeFile(coin_file, csv, function(err) {
            if (err) console.log(coin_name + 'FAILED');
            console.log(coin_name + ' saved');
        });
    });
    
    
}


function main() {
    console.log('Starting data scraping...');
    var coin_urls = [];
    
    for (i=0; i < coins.length; i++){
        coinName = coins[i];
        requestURL = 'https://bittrex.com/Api/v2.0/pub/market/GetTicks?marketName=BTC-' + coinName + '&tickInterval=oneMin';
        coin_urls[i] = [requestURL, coinName];
    }
    
    for(var i in coin_urls){
        try {
            doSetTimeout(i);
        }
        catch(err){
            console.log(err);
        }
    }

    function doSetTimeout(i) {
        setTimeout(function() {
            getAPI(coin_urls[i][0], coin_urls[i][1]);
        }, 150 * i);
    }

    console.log('process completed.')
    
}
main();
setInterval(main, 864000000);