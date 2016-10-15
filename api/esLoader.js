var esl = require('./fileLoader.js');
var elasticsearch = require('elasticsearch');
// var encoding = require("encoding");
var iconv = require('iconv-lite');
var utf8 = require('utf8');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});
var i = 0;
var esLoader = function(config) {

    var bulkData = [];
    var header = null;

    function convert(text, sourceEncoding) {

        // return text
        return text;
        // return iconv.decode(iconv.encode(text,"UTF-8" ), 'ISO-8859-1');
        // return iconv.decode(text, "iso-8859-1");
        // return iconv.decode(iconv.encode(text, 'iso-8859-1'), 'utf-8');
        // str = iconv.decode(new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
        // return text;
        // return encoding.convert(text, 'UTF-8', sourceEncoding);
    }

    function addDocumentAction(id, lineArray, type, action, callback) {

        if (header == null) {
            header = [];
            for (var i=0; i<lineArray.length; i++) {
                header[i] = convert(lineArray[i],'Windows1252');

            }
            callback();
        } else {
            var data = {};
            for (var i=0; i<lineArray.length; i++) {
                data[header[i]] = convert(lineArray[i],'Windows1252');
                console.log(data[header[i]])
            }

            delete data['Arkivref.']
            // console.log(data);
            var dataAction = {}
            dataAction[action] = { 
                '_index' : 'bankomat',
                '_type' : type,
                '_id': id
            }

            bulkData.push(dataAction);
            bulkData.push(data);

            if (bulkData.length >= 500) {
                // console.log("LOAD DATA")
                loadData(callback);
            } else {
                callback();
            }

        }

    }

    function loadData(callback) {
        // console.log("BULK LOADING")
        // console.log(bulkData);
        client.bulk({
          body: bulkData
        }, function (err, resp) {
            callback(err, resp);
        });

        // client.bulk({
        //   body: [
        //     // action description
        //     { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
        //      // the document to index
        //     { title: 'foo' },
        //     // action description
        //     // { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
        //     // // the document to update
        //     // { doc: { title: 'foo' } },
        //     // // action description
        //     // // { delete: { _index: 'myindex', _type: 'mytype', _id: 3 } },
        //     // no document needed for this delete
        //   ]
        // }, function (err, resp) {
        //     callback(err, resp);
        // });
        // client.bulk({
        //     body: [
        //             { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } }
        //         ]
        // },
        // function(err, resp) {
        //     bulkData = [];
        //     callback(err, resp);
        // });
    }

    return {
        addDocumentAction: addDocumentAction,
        loadData: loadData
    }

}


module.exports = esLoader;
