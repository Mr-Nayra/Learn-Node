const fs = require("fs"); //imports file system functionality

console.log("Hello from Node.js");
fs.writeFileSync("hello.txt", "hello from node js");
