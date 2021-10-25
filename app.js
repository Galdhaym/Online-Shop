const express = require('express');
const app = express();
var hbs = require('hbs');
const expressHbs = require("express-handlebars");
var session = require('express-session');
var uuid = require("uuid");
var mongoose = require("./connect_MongoDB");
const MongoStore = require('connect-mongo')(session);

const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
));

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname));

var mongoStore = new MongoStore({ clientPromise: mongoose.connectToMongoDB()});

mongoStore.on("create", async function(sessionID){
    var connection = await mongoose.connectToMongoDB();
    var session = connection.db("catalog").collection("sessions");
    await session.updateOne(
        {"_id": sessionID},
        {
            $set:{
                role: "guest"
            }
        }
    );
});

app.use(session({
    genid: function(req) {
      var sessionID = uuid.v1();
      console.log(sessionID);
      return sessionID;
    },
    maxAge: 30000,
    secret: 'keyboard cat',
    name: "session-id",
    store: mongoStore,
    cookie : {
        maxAge : 1000 * 3600,
    }
}));
module.exports = mongoStore;

var indexRouter = require("./routes/index_router");
var cartRouter = require("./routes/cart_router");
var orderRouter = require("./routes/order_router");

app.use("/", indexRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(3000);