var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');



var fileLoader = function(config) {


    function loadCsv(inputFile, eachRowCallback) {

        var parser = parse({delimiter: '\t'}, function (err, data) {
          async.eachSeries(data, function (line, callback) {
            // do something with the line
            // doSomething(line).then(function() {
            //   // when processing finishes invoke the callback to move to the next one
            //   callback();
            // });
            
            eachRowCallback(line, callback);
            // console.log(line);
            // callback();
          });
        });

        fs.createReadStream(inputFile, {encoding: "binary"}).pipe(parser);

    }

    return {
        loadCsv : loadCsv
    }
}

module.exports = fileLoader;