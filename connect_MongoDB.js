const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:zlatodima@internetshopcluster.vkdnl.mongodb.net/catalog?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useUnifiedTopology: true });
var connection = mongoClient.connect();
module.exports.connectToMongoDB = function () {
	return connection;
};
