const http = require("http");
const routes = require("./routes");

// // function rqListener(req, res) {
// // }
// // http.createServer(rqListener);

// const server = http.createServer((req, res) => {
//   // //called by node js whenever a request reaches the server
//   // console.log(req.url, req.method, req.headers); // / get allTheHeaders
//   // // process.exit //closses the event listener therefore closes the server

//   //Sending response
//   const url = req.url;
//   const method = req.method;

// });

const server = http.createServer(routes);

server.listen(80);
