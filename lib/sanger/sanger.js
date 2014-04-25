var extend              = require('util')._extend,
    elastic_client      = app.get('elastic_search_client'),
    index_data         = {index: 'sanger', type: 'products'};

exports.get= function (app, req){
    var results = [];


    return results;
};

exports.create = function (app, req, callback) {

    var merged_data = extend(index_data, req.body['product']);
    elastic_client.index(merged_data, function (err, resp) {
        console.log('res' + JSON.stringify(resp));
        console.log('err' + JSON.stringify(err));
        callback({'result': resp, 'error': err});
    });
};