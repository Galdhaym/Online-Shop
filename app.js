const express = require('express');
const app = express();

const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.set("view engine", "hbs");
app.use(express.static(__dirname));

var indexRouter = require("./routes/index_router");
app.use("/", indexRouter);

app.listen(3000);