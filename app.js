const express = require('express');
const app = express();
var indexRouter = require("./routes/index_router");

app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use("/", indexRouter);

app.listen(3000);