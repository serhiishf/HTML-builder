const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const src = path.join(__dirname, "files");
const dist = path.join(__dirname, "files-copy");
console.log('Please wait...');

async function copyStart() {
  return new Promise((resolve) =>
    fs.rm(dist, { recursive: true }, () => resolve())
  ).then(() => copyFolder());
}


async function copyFolder() {
  try {
    const createFolder = await fs.mkdir(dist,  {recursive: true},  async (err) => {
      if(err) throw err;
    })
    const copyFile = await fs.readdir(src, (err, data) => {
      if(err) throw err;
      //console.log("readfile");
      //copyFile(data);
      
        for(const file of data) {
          fsPromises.copyFile(path.join(src, file), path.join(dist, file))
          .then(() => {})
          .catch((err)=> {throw err})
          }
      })
      console.log("Folder copied!")
  } catch(err) {
    console.log(err)
  }
}

copyStart();
