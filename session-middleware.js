var MongoStore = require("./app");
var uuid = require("uuid");

module.exports.checkSessionId = function(req, res, next){
    MongoStore.get(req.session.id, function(err, session){
        if(err.code === 'ENOENT'){
            var sessionID = uuid.v1(); 
            req.session.id = sessionID;
            next();
        }
        else{
            next();
        }
    });
}