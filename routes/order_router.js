var express = require("express");
var middleware = require("../session-middleware");
var order_controller = require("../controllers/ordering_controller.js");
var router = express.Router();

router.get("/", middleware.checkSessionId, order_controller.loadOrderPage);

module.exports = router;