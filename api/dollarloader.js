var elasticsearchLoader = require('./esLoader.js');
var fileLoader = require('./fileLoader.js');
var uuid = require('uuid');

var config = {
    'es' : {
        'hosts': ["localhost:9200"]
    }
}


var esLoader = elasticsearchLoader(config);

var fLoader = fileLoader(config);


// LOAD ROW CALLBACK
function eachRowCallback(line, callback){
    // var id = "1";
    // var type ="test";
    // // console.log(line);
    // var action = "index";
    // // console.log("LOOADINGF");
    // var data = {
    //     "test" : "test"
    // }
    var id = uuid.v4();
    var type = 'transaction';
    var action = 'index';
    esLoader.addDocumentAction(id, line, type, action, callback);
}

function finalCallback() {
    esLoader.loadData();
}


fLoader.loadCsv('./transaksjoner.csv', eachRowCallback);
