const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        //error handling function
        res.statusCode = 302; //302 stands for redirection
        res.setHeader("Location", "/"); //redirection
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>hello from my node js server</h1></body>");
  res.write("</html>");
  res.end(); //writing after ending a response will result in error
};

module.exports = requestHandler;

// //other ways to export
// //first
// module.exports = {
//     handler: requestHandler,
//     someText: 'hi from route module'
// }
// //second
// exports.handler = requestHandler; //or module.exports.handler
// exports.someText = 'hi from route module'