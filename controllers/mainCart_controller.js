var cart = require("../add_to_cart_back");
var catalog_controller = require("../controllers/mongoDB_controller");
const querystring = require('querystring');

async function parseQueryString(req, queryString){
    var params = querystring.parse(req.url);
    var id = params["id"];
    return id;
}

async function parseQueryStringCount(req, queryString){
    var params = querystring.parse(req.url);
    var id = params["id"];
    var count = params[queryString];
    return {count, id};
}

exports.loadCartDataHandler = function loadCartDataHandler(req, res, next){
    cart.getALLFromCartDB().then(cartData =>{
        res.render("cartPage.hbs", {cartData});
    });
}

exports.increaseCountProductHandler = function(req, res, next){
    var queryString = "/increaseCount?id"
    parseQueryString(req, queryString).then(id =>{
        cart.increaseCountCart(id).then(success =>{
            res.send("success");
        });
    });
}

exports.decreaseCountProductHandler = function(req, res, next){
    var queryString = "/decreaseCount?id"
    parseQueryString(req, queryString).then(id =>{
        cart.decreaseCountCart(id).then(success =>{
            res.send("success");
        });
    });
}

exports.changeCountProductHandler = function(req, res, next){
    var queryString = "/changeCount?count"
    parseQueryStringCount(req, queryString).then(queryObj =>{
        cart.changeCountCart(queryObj).then(success =>{
            res.send("success");
        });
    });
}

exports.deleteFromMainCartHandler = function(req, res, next){
    var queryString = "/deleteCartRecord?id";
    catalog_controller.deleteFromCartMain(req, queryString, res);
}

exports.deleteAllRecordsInCartHandler = function(req, res, next){
    cart.deleteAllCartRecords().then(success =>{
        res.send("success");
    });
}

