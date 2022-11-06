const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const dist = path.join(__dirname, "project-dist/bundle.css");
const src = path.join(__dirname, "styles");

fsPromises.writeFile(dist, "")
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.readdir(src, {withFileTypes: true}, (err, data) => {
        if(err) console.log(err)
        resolve(data)
    })
    
/*       
        fs.readdir(src, {withFileTypes: true}, (err, data) => {
      if(err) console.log(err)
        for(const file of data) {
        const extFile = path.extname(file.name);
        if(extFile == '.css'){
          console.log('23123')
          //fsPromises.appendFile(dist, fsPromises.readFile(path.join(__dirname, file.name).toString()))
          //fs.readFile(path.join(__dirname, file.name))
        }
      }
 */
    })
  }).then(data => console.log('it work', data))
  .catch((err) => console.log(err))




