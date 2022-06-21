const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const admindata = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.engine("handlebars", expressHbs({ layoutsDir: "views/layouts/" , defaultLayout: 'main-layout'}));
app.set("view engine", "handlebars");
app.set("views", "views"); //sets the path for the directory in which templates are kept

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// used to serve static files in public folder like style.css

app.use("/admin", admindata.routes); //routes will start with /admin/..,
app.use(shopRoutes);

app.use("/", (req, res) => {
  res.send("<h1>Page not found</h1>");
});

app.listen(3000);
