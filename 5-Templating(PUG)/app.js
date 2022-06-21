
const express = require("express");
const path = require("path");
const admindata = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'pug'); //sets pug globally as the templating engine
app.set('views' , 'views'); //sets the path for the directory in which templates are kept

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// used to serve static files in public folder like style.css

app.use("/admin", admindata.routes); //routes will start with /admin/..,
app.use(shopRoutes);

app.use("/", (req, res) => {
  res.send("<h1>Page not found</h1>");
});

app.listen(3000);
