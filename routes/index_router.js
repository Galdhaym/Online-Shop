var express = require("express");
var catalog_controller = require("../controllers/mongoDB_controller");
var router = express.Router();

router.get("/", catalog_controller.loadAllDataHandler);

router.get("/add-to-cart", catalog_controller.addToCartHandler);

router.get("/delete-from-cart", catalog_controller.deleteFromCartHandler);

module.exports = router;