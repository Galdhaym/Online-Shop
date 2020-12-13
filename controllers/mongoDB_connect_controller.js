var mongoClientObj = require("../mongoDB_connect");

exports.loadCatalogHandler = function(req, res){
    mongoClientObj.loadCatalog(mongoClientObj.MongoClient);
    res.send("dima");
}