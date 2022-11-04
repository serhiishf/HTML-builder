const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const routeDir = path.join(__dirname, "text.txt");

reader = fs.createReadStream(routeDir, "utf-8");

reader.on('data', function (chunk) {
    console.log(chunk.toString());
});