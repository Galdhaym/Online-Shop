var mongoClient = require("./connect_MongoDB");
module.exports.findCatalog = async function(){
        var client = await mongoClient.connectToMongoDB();
        var db = client.db("catalog");
        var collection = db.collection("catalog");

        //pushCatalogToDB(collection);
        var query = {"type":"manga"};
        var catalogArray = await collection.find(query).limit(6).toArray();
    return catalogArray;
}

function pushCatalogToDB(collection){
    var products = [];
    products.push({"id":"1", "type":"manga", "product":"My Hero Academia", "cost": 100, "existsCount": 3, "ref_img":"My-Hero-Academia"});
    products.push({"id":"2", "type":"manga", "product":"Seven Deadly Sins", "cost": 100, "existsCount": 4, "ref_img":"Seven-Deadly-Sins"});
    products.push({"id":"3", "type":"manga", "product":"Death Note", "cost": 100, "existsCount": 6, "ref_img":"Death-Note"});
    products.push({"id":"4", "type":"manga", "product":"Fairy Tail", "cost": 100, "existsCount": 3, "ref_img":"Fairy-Tail"});
    products.push({"id":"5", "type":"manga", "product":"Dragonball", "cost": 100, "existsCount": 4, "ref_img":"Dragonball"});
    products.push({"id":"6", "type":"manga", "product":"Bleach", "cost": 100, "existsCount": 6, "ref_img":"Bleach"});
    products.push({"id":"7", "type":"manga", "product":"Black Clever", "cost": 100, "existsCount": 3, "ref_img":"Black-Clever"});
    products.push({"id":"8", "type":"manga", "product":"Naruto", "cost": 100, "existsCount": 4, "ref_img":"Naruto"});
    products.push({"id":"9", "type":"manga", "product":"Black Lagoon", "cost": 100, "existsCount": 6, "ref_img":"Black-Lagoon"});
    try {
        collection.insertMany(products);
    }
    catch(e){
        throw e;
    }  
}



   


