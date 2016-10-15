var fs  = require("fs");

fs.readFileSync('./transaksjoner.csv', {encoding: "binary"}).toString().split('\n').forEach(function (line) { 
    console.log(line);
    fs.appendFileSync("./output.txt", line.toString() + "\n");
});