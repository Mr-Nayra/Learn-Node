const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello</title></head>");
    res.write("<body><h1>Welcome to my server</h1></body>");
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Send</button></form>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello</title></head>");
    res.write("<body><ul><li>User1</li><li>User 2</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      res.statusCode = 302; //302 stands for redirection
      res.setHeader("Location", "/"); //redirection
      return res.end();
    });
  }
};

module.exports = requestHandler;
