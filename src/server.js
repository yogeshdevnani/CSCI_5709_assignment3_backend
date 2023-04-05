const MongoConnect=require("./config/db");


const app = require("express")();
const cors = require("cors");
const parser = require("express").json;
const routes = require("./routes");

app.use(cors());
app.use(parser());
app.use(routes);

MongoConnect();
module.exports = app;
