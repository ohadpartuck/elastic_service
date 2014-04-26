var extend              = require('util')._extend,
    elastic_client      = GLOBAL.ELASTIC_CLIENT;
    index_data          = {index: 'sanger', type: 'products'};

exports.get = function (req, callback){
    var qryObj = build_query(req);

    search(qryObj, callback);
    return {'result': 'query sent to elastic search'};
};

exports.create = function (app, req, callback) {

    var merged_data = extend(index_data, req.body['product']);
    elastic_client.index(merged_data, function (err, resp) {
        console.log('res' + JSON.stringify(resp));
        console.log('err' + JSON.stringify(err));
        callback({'result': resp, 'error': err});
    });
};


function search(qryObj, callback){

//    elastic_client.search(index_data['index'], index_data['type'], {
    elastic_client.search("sanger", "products", {
        "from": 0,
        "size": 50,
        "sort": {
            "_score": {
                "order": "asc"
            }
        },
        "fields": [
            "type",
            "tags",
            "stores_available_in",
            "product_id"
        ],
        "explain": true
    }).then(function (resp) {
        var hits = resp.body.hits;
        console.log('result_from search areeee + ' + JSON.parse(hits));
    })

}

function build_query(req){
    var product_id = req.body['product_id'];
   if (product_id === undefined){
    return {};
   }
   else{
      return {'product_id': product_id};
   }
}