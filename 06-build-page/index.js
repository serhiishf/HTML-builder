const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const prDist = path.join(__dirname, "project-dist");

async function startBuild() {
    return new Promise((resolve) =>
        fs.rm(prDist, { recursive: true }, () => resolve())
    ).then(() => createFolder());
}

async function createFolder() {
    fsPromises.mkdir(prDist, { recursive: true })
        .then(console.log(213))
}

async function copyFolder(src, dist) {
    return new Promise((resolve) =>
        fs.rm(dist, { recursive: true }, () => resolve())
    )
        .then(() => console.log("next funct"));

    /*     async function copyFolder() {
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
          } */
}





startBuild();