var mongoClient = require("./connect_MongoDB");
module.exports.addCartRecord = async function(id){
        var db = await getCatalogDB();
        var collection = db.collection("catalog");
        var query = {"id":id};
        var catalogArray = await collection.find(query).toArray();
        var collectionCart = db.collection("shop_cart");
        var catalogElem = catalogArray[0];

        var existCatalog = await collectionCart.find(query).toArray();
        var existCatalogElem = existCatalog[0];  
        if(existCatalog.length > 0){
            await collectionCart.updateOne(query,{
                $inc: {"count": 1}
            });  
        }   
        else{ 
            catalogElem.count = 1;
            await collectionCart.insertOne(catalogElem);
        }
    return 1;
}

module.exports.getFromCartDB = async function(id){
        var db = await getCatalogDB();
        var collectionCart = db.collection("shop_cart");
        var query = {"id":id};
        var catalogArray = await collectionCart.find(query).toArray();
        var catalogElem = catalogArray[0];
        return catalogElem;
}

module.exports.getALLFromCartDB = async function(){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var catalogArray = await collectionCart.find().toArray();
    console.log(catalogArray);
    return catalogArray;
}

async function getCatalogDB(){
    var client = await mongoClient.connectToMongoDB();
    var db = client.db("catalog");
    return db;
}

module.exports.getCountRecordsCartDb = async function(id){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");

    var arrayCount = await collectionCart.find({},{"count":true}).toArray();
    console.log("count" + arrayCount[0].count);
    var sum = 0;
    for(var i = 0;i < arrayCount.length;i++){
        sum = arrayCount[i].count + sum;
    }
    console.log("sum" + sum);
    return sum;
}

module.exports.deleteCartRecord = async function(id){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var query = {"id":id};

    var result = await collectionCart.deleteOne(query);
    return 1;
}
