var mongoClientObj = require("../catalog");
var cart = require("../add_to_cart_back");
const querystring = require('querystring');

async function loadCatalogData(){
    var foundCatalog = await mongoClientObj.findCatalog();
    return foundCatalog;
}

async function loadCartData(){
    var cartData = await cart.getALLFromCartDB();
    return cartData;
}

async function parseQueryString(req, queryString){
    var params = querystring.parse(req.url);
    var ID = params[queryString];
    return ID;
}

exports.loadAllDataHandler = function(req, res, next){
    var foundCatalogPromise = loadCatalogData();
    var cartDataPromise = loadCartData();
    Promise.all([foundCatalogPromise, cartDataPromise]).then((promiseValues) => {
        var foundCatalog = promiseValues[0];
        var cartData = promiseValues[1];
        res.render("mainPage.hbs", {foundCatalog, cartData});
    });
}

exports.addToCartHandler = function(req, res, next){
    var queryString = '/add-to-cart?id';
    parseQueryString(req, queryString).then(ID=>{
        cart.addCartRecord(ID).then(success =>{
            cart.getFromCartDB(ID).then(cartDBRecord =>{
                cart.getCountRecordsCartDb(ID).then(countRecordsCartDb =>{
                    var record = {
                        cartDBRecord,
                        countRecordsCartDb
                    }
                    console.log(JSON.stringify(record));
                    res.send(JSON.stringify(record));
                });
            });
        });
    });
}

exports.deleteFromCartHandler = function(req, res, next){
    var queryString = "/delete-from-cart?id";
    parseQueryString(req, queryString).then(ID=>{
        cart.deleteCartRecord(ID).then(success =>{
            res.send(JSON.stringify(ID));
        });
    });
}

