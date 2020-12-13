const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://admin:zlatodima@internetshopcluster.vkdnl.mongodb.net/catalog?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, 
    { useUnifiedTopology: true });

mongoClient.connect(function(err){
    if(err){
        console.log(err);
    }
});

module.exports.loadCatalog = function(user){
    var db = user.db("catalog")
    var collection = db.collection("catalog");
    pushCatalogToDB(collection);
    var query = {"id":"1"};
    collection.findOne(query, function(err, user){
        console.log(user);
    });
}

function pushCatalogToDB(collection){
    var products = [];
    products.push({"id":"1", "product":"Computer", "cost": 20000, "count": 3});
    products.push({"id":"2", "product":"Printer", "cost": 10000, "count": 4});
    products.push({"id":"3", "product":"PS4", "cost": 15000, "count": 6});
    collection.insertMany(products);
}

module.exports.MongoClient = mongoClient;


   


