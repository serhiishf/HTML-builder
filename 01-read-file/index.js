const fs = require("fs");
const path = require("path");

const reader = fs.createReadStream(path.join(__dirname, "text.txt"), "utf-8");
reader.on('data', (content) => {
  console.log(content.toString());
}); 
