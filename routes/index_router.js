var express = require("express");
var catalog_controller = require("../controllers/mongoDB_connect_controller");
var router = express.Router();

router.get("/", catalog_controller.loadCatalogHandler);

module.exports = router;