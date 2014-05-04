var extend              = require('util')._extend,
    elastic_client      = ELASTIC_CLIENT,
    sangerConstants     = SANGER_CONSTATNTS,
    mainConstants       = MAIN,
    whereToSearch       = {_index: 'sanger', _type: 'products'},
    productFields       = SANGER_CONSTATNTS['product_fields'];
var whatToSearch        = [ productFields['id'],
                            productFields['name'],
                            productFields['stores_available_in'],
                            productFields['tags'],
                            productFields['locale']
                        ];

exports.get = function (req, callback){
    var qryObj          = buildQuery(req);

    search(whatToSearch, whereToSearch, elastic_client, qryObj, callback);
    return {'result': 'query sent to elastic search'};
};

exports.create = function (req, callback) {
    var input = gatherInput(req);

    elastic_client.index(input['options'], input['doc'], function (err, resp) {
        elasticCrudCallback(err, resp, callback);
    });
};

exports.update = function (req, callback) {
    var input = gatherInput(req);

    elastic_client.update(input['options'], {doc: input['doc']}, function (err, resp) {
        elasticCrudCallback(err, resp, callback);
    });
};

exports.delete = function (req, callback) {
    var _id = req.body[mainConstants['bson_id']];

    elastic_client.delete({ _id : _id}, function (err, resp) {
        elasticCrudCallback(err, resp, callback);
    });
};

function gatherInput(req){
    var doc     = req.body[sangerConstants['product_data']],
        bson_id = req.body[mainConstants['bson_id']];
    var options = extend(whereToSearch, {_id: bson_id});

    return {options: options, doc: doc};
}