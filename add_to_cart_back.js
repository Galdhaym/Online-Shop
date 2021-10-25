var mongoClient = require("./connect_MongoDB");
var ObjectID = require('mongodb').ObjectID
module.exports.addCartRecord = async function(ProductID, userID){
        var db = await getCatalogDB();
        var collection = db.collection("catalog");
        var query = {"id": ProductID};
        var catalogArray = await collection.find(query).toArray();
        var collectionCart = db.collection("shop_cart");
        var catalogElem = catalogArray[0];
        var queryWithUser = {
            "id": ProductID,
            "userID": userID
        }

        var existCatalog = await collectionCart.find(queryWithUser).toArray();
        var existCatalogElem = existCatalog[0];  
        if(existCatalog.length > 0){
            await collectionCart.updateOne(queryWithUser,{
                $inc: {"count": 1}
            });  
        }   
        else{ 
            catalogElem.count = 1;
            catalogElem.userID = userID;
            catalogElem._id = ObjectID();
            await collectionCart.insertOne(catalogElem);
        }
    return 1;
}

module.exports.getFromCartDB = async function(ProductID, userID){
        var db = await getCatalogDB();
        var collectionCart = db.collection("shop_cart");
        var queryWithUser = {
            "id": ProductID,
            "userID": userID
        }
        var catalogArray = await collectionCart.find(queryWithUser).toArray();
        var catalogElem = catalogArray[0];
        return catalogElem;
}

module.exports.getALLFromCartDB = async function(userID){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var queryWithUser = {
        "userID": userID
    }
    var catalogArray = await collectionCart.find(queryWithUser).toArray();
    console.log(catalogArray);
    return catalogArray;
}

async function getCatalogDB(){
    var client = await mongoClient.connectToMongoDB();
    var db = client.db("catalog");
    return db;
}

module.exports.getCountRecordsCartDb = async function(userID){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var query = {
        "userID": userID
    }

    var arrayCount = await collectionCart.find(query,{"count":true}).toArray();
    var sum = 0;
    for(var i = 0;i < arrayCount.length;i++){
        sum = arrayCount[i].count + sum;
    }
    console.log("sum" + sum);
    return sum;
}

module.exports.deleteCartRecord = async function(id, userID){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var query = {
        "id":id,
        "userID":userID
    };

    var result = await collectionCart.deleteOne(query);
    return 1;
}

async function changeCount(inc, id, userID){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var query = {
        "id":id,
        "userID":userID
    };
    var existCatalog = await collectionCart.find(query).toArray();

    if(existCatalog.length > 0){
        await collectionCart.updateOne(query,{
            $inc: {"count": Number(inc)}
        });  
    }
    return 1;
}

module.exports.increaseCountCart = async function(id, userID){
    await changeCount(1, id, userID);
}

module.exports.decreaseCountCart = async function(id, userID){
    await changeCount(-1, id, userID);
}

module.exports.changeCountCart = async function(queryObject, userID){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var query = {
        "id": queryObject.id,
        "userID": userID
    };
    var existCatalog = await collectionCart.find(query).toArray();

    if(existCatalog.length > 0){
        await collectionCart.updateOne(query,{
            $set: {"count": Number(queryObject.count)}
        });  
    }
    return 1;
}

module.exports.deleteAllCartRecords = async function(userID){
    var db = await getCatalogDB();
    var collectionCart = db.collection("shop_cart");
    var query = {
        "userID":userID
    };
    await collectionCart.deleteMany(query);
    return 1;
}
