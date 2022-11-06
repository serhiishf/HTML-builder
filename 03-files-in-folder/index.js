const fs = require("fs");
const path = require("path");

fs.readdir(path.join(__dirname, "secret-folder"), {withFileTypes: true}, (err, data) => {
  if(err){
    throw err
  }
  data.forEach((file) => {
    let route = path.join(__dirname, `/secret-folder/` + file.name);
    fs.stat(route, (err, stats) => {
      if(err) throw err
      if(stats.isFile()){
        const extension = path.extname(route).replace('.', '');
        console.log(path.parse(route).name + "\t - \t" + extension + "\t - \t" + (stats.size / 1024).toFixed(3) + 'kb')
        //console.log(stats);
      }
    })
  })
})