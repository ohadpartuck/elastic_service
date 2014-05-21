var     elastic_client      = ELASTIC_CLIENT,
        extend              = require('util')._extend;

genericSearch = function(req, callback, whatToSearch, whereToSearch){
    var qryObj  = buildQuery(req);
    var options = extend(whatToSearch, whereToSearch);

    elastic_client.search(options, {
        query : qryObj
    }, function (err, data) {
        if (err || data === undefined){
            console.log(err);
            callback.json(err)
        }else{
            callback.json(data['hits'].hits);
        }
    });
};

genericElasticCreate = function(req, callback, whereToSearch, inputDataField){
    var input = gatherInput(req, whereToSearch, inputDataField);

    elastic_client.index(input['options'], input['doc'], function (err, resp) {
        elasticCrudCallback(err, resp, callback);
    });
};

genericElasticUpdate = function(req, callback, whereToSearch){
    var input = gatherInput(req, whereToSearch, inputDataField);

    elastic_client.update(input['options'], {doc: input['doc']}, function (err, resp) {
        elasticCrudCallback(err, resp, callback);
    });
};

genericElasticDelete = function(req, callback){
    var _id = req.body[mainConstants['bson_id']];

    elastic_client.delete({ _id : _id}, function (err, resp) {
        elasticCrudCallback(err, resp, callback);
    });
};
