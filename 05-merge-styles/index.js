const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const dist = path.join(__dirname, "project-dist/bundle.css");
const src = path.join(__dirname, "styles");

fsPromises.writeFile(dist, "")
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readdir(src, { withFileTypes: true }, (err, data) => {
        if (err) console.log(err)
        resolve(data)
      })
    })
  })
  .then((data) => {
    return new Promise((resolve, reject) => {
      readWrite()
      async function readWrite() {
        console.log("async func")
        for (const file of data) {
          if (path.extname(file.name) == '.css') {
            const content = await fsPromises.readFile(path.join(__dirname, "styles", file.name));
            //console.log(content.toString())
            const contentStr = "\n" + content.toString();
            const writeContent = await fsPromises.appendFile(dist, contentStr);
          }
        }
      }
      console.log("last")
      resolve();
    })

  })
  .catch((err) => console.log(err))




