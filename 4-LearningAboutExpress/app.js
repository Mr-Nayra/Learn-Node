// const express = require("express");

// const app = express();

// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next(); //Allows the request to continue to the next middlewares in line
// });

// app.use((req, res, next) => {
//   console.log("In another middleware");
//   res.send("<h1>Hello from express</h1>");
// });

// app.listen(3000);

//adding paths
const express = require("express");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// used to serve static files in public folder like style.css

app.use("/admin", adminRoutes); //routes will start with /admin/..,
app.use(shopRoutes);

app.use("/", (req, res) => {
  res.send("<h1>Page not found</h1>");
});

app.listen(3000);
