var express = require("express");
var cart_controller = require("../controllers/mainCart_controller");
var router = express.Router();

router.get("/", cart_controller.loadCartDataHandler);

router.get("/deleteCartRecord", cart_controller.deleteFromMainCartHandler);

router.get("/increaseCount", cart_controller.increaseCountProductHandler);

router.get("/decreaseCount", cart_controller.decreaseCountProductHandler);

router.get("/changeCount", cart_controller.changeCountProductHandler);

router.get("/removeCart", cart_controller.deleteAllRecordsInCartHandler);

module.exports = router;