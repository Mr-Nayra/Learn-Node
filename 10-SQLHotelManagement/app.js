const path = require("path");


const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const customerManagerRoutes = require("./routes/customerManager");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(customerManagerRoutes);
app.use(errorController.get404);

app.listen(3000);
