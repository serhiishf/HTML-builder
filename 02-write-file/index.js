const fs = require("fs");
const path = require("path");
const readline = require('readline');
//const process = require('process');
const { stdin: input, stdout: output, exit: exit } = require('process');
const interface = readline.createInterface({input, output, exit});

const filePath = path.join(__dirname, "text.txt");

fs.writeFile(filePath, '', (err) => {
  if(err){
    throw err
  }
})

interface.write("Please, write your text \n");
interface.on('line', (data) => {
  if(data.toLowerCase() == 'exit'){
    interface.write("File created! Good buy!");
    process.exit();
  }  else {
    fs.appendFile(filePath, `${data}\n`, (err) => {
      if(err){
        throw err
      }
    })
  }
})

interface.on("SIGINT", ()=> {
  console.log('Exit! File created, Good buy!');
  process.exit();
})


















