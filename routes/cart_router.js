var express = require("express");
var cart_controller = require("../controllers/mainCart_controller");
var middleware = require("../session-middleware");
var router = express.Router();

router.get("/", middleware.checkSessionId, cart_controller.loadCartDataHandler);

router.get("/deleteCartRecord", middleware.checkSessionId, cart_controller.deleteFromMainCartHandler);

router.get("/increaseCount", middleware.checkSessionId, cart_controller.increaseCountProductHandler);

router.get("/decreaseCount", middleware.checkSessionId, cart_controller.decreaseCountProductHandler);

router.get("/changeCount", middleware.checkSessionId, cart_controller.changeCountProductHandler);

router.get("/removeCart", middleware.checkSessionId, cart_controller.deleteAllRecordsInCartHandler);

module.exports = router;