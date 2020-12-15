var mongoClientObj = require("../mongoDB_connect");

exports.loadCatalogHandler = async function(req, res, next){
    try {
        var foundCatalog = await mongoClientObj.findCatalog();
        console.log(foundCatalog);
        res.render("mainPage.hbs",
            {
                foundCatalog
            }
        );
    } catch (e) {
        next(e);
    }
}