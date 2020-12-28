const express = require('express');
const app = express();
var hbs = require('hbs');
const expressHbs = require("express-handlebars");

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

var indexRouter = require("./routes/index_router");
var cartRouter = require("./routes/cart_router");
app.use("/", indexRouter);
app.use("/cart", cartRouter);

app.listen(3000);