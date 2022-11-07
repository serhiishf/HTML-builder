const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const fsPromises = require("fs").promises;

const prDist = path.join(__dirname, "project-dist");
console.log("Please wait...");
async function startBuild() {
  return new Promise((resolve) =>
    fs.rm(prDist, { recursive: true }, () => resolve())
  )
    .then(() => createFolder())
    .then(() =>
      copyFolder(
        path.join(__dirname, "assets"),
        path.join(__dirname, "project-dist", "assets")
      )
    )
    .then(() =>
      bundleCss(
        path.join(__dirname, "styles"),
        path.join(__dirname, "project-dist", "style.css")
      )
    )
    .then(() =>
      buildHtml(
        path.join(__dirname, "components"),
        path.join(__dirname, "project-dist"),
        path.join(__dirname, "template.html")
      )
    )
    .then(() => console.log("Finish"));
}

async function createFolder() {
  fsPromises.mkdir(prDist, { recursive: true });
  console.log("Create Folder");
}

async function copyFolder(src, dist) {
  //----clear folder
  return new Promise((resolve) =>
    fs.rm(dist, { recursive: true }, () => resolve())
  ).then(() => copyFiles());
  async function copyFiles() {
    try {
      const createFolder = await fs.mkdir(
        dist,
        { recursive: true },
        async (err) => {
          if (err) throw err;
        }
      );
      const copyFile = await fs.readdir(src, (err, data) => {
        if (err) throw err;
        for (const file of data) {
          fs.stat(path.join(src, file), (err, stats) => {
            if (err) console.log(err);
            if (stats.isDirectory()) {
              copyFolder(path.join(src, file), path.join(dist, file));
            } else if (stats.isFile()) {
              fsPromises.copyFile(path.join(src, file), path.join(dist, file));
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

async function bundleCss(src, dist) {
  fsPromises
    .writeFile(dist, "")
    .then(() => {
      return new Promise((resolve, reject) => {
        fs.readdir(src, { withFileTypes: true }, (err, data) => {
          if (err) console.log(err);
          resolve(data);
        });
      });
    })
    .then((data) => {
      return new Promise((resolve, reject) => {
        readWrite();
        async function readWrite() {
          for (const file of data) {
            if (path.extname(file.name) == ".css") {
              const content = await fsPromises.readFile(
                path.join(__dirname, "styles", file.name)
              );
              //console.log(content.toString())
              const contentStr = "\n" + content.toString();
              const writeContent = await fsPromises.appendFile(
                dist,
                contentStr
              );
            }
          }
        }
        resolve();
      });
    })
    .catch((err) => console.log(err));
}

async function buildHtml(src, dist, template) {
  fsPromises
    .writeFile(path.join(dist, "index.html"), "")
    .then(() => {
      //----get file html
      return new Promise(async (resolve, reject) => {
        await fs.readFile(template, (err, data) => {
          if (err) console.log(err);
          let templHtml = data.toString();
          resolve(templHtml);
        });
      });
    })
    .then((templHtml) => {
      return new Promise(async (resolve, reject) => {
        await insertHtml(templHtml);
      });
    });

  async function insertHtml(templHtml) {
    return new Promise(async (resolve, reject) => {
      await fs.readdir(src, { withFileTypes: true }, async (err, data) => {
        if (err) console.log(err);
        htmlTxt = templHtml;
        await createTempHtml(data);
        async function createTempHtml(data) {
          for (const file of data) {
            if (path.extname(file.name) == ".html") {
              if (htmlTxt.includes(path.parse(file.name).name)) {
                const regex = new RegExp(
                  "{{" + path.parse(file.name).name + "}}",
                  "i"
                );
                let replaceTxt = await fsPromises.readFile(
                  path.join(__dirname, "components", file.name)
                );
                replaceTxt = replaceTxt.toString();
                htmlTxt = htmlTxt.replace(regex, replaceTxt);
              }
            }
          }
        }
        await writeHtml(htmlTxt, dist);
        async function writeHtml(htmlTxt, dist) {
          fsPromises.writeFile(path.join(dist, "index.html"), htmlTxt);
        }
      });
      resolve();
    });
  }
}

startBuild();
