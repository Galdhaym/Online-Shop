var cart = require("../add_to_cart_back");

exports.loadOrderPage = function(req, res, next){
    res.render("orderPage.hbs");
}