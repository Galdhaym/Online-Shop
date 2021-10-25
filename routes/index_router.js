var express = require("express");
var catalog_controller = require("../controllers/mongoDB_controller");
var middleware = require("../session-middleware");
var router = express.Router();

router.get("/", middleware.checkSessionId, catalog_controller.loadAllDataHandler);

router.get("/add-to-cart", middleware.checkSessionId, catalog_controller.addToCartHandler);

router.get("/delete-from-cart", middleware.checkSessionId, catalog_controller.deleteFromCartHandler);

module.exports = router;
