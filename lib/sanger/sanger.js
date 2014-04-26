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

    elastic_client.search({
        _index : 'sanger',
        _type  : 'products',
        fields: [
            'tags',
            'stores_available_in',
            'product_id',
            'locale',
            'name'
        ]
    }, {
        query : qryObj
    }, function (err, data) {
        callback(data['hits'].hits);
    });
}

//todo - build more complicated queries here. fuzzy search, match search, regex search.
function build_query(req){
    var product_id = req.query['product_id'];
    if (product_id === undefined) return { match_all : {} };
    else
        return {filtered: {
                    query: {
                        query_string: {
                            query: 'product_id: ' + product_id
                        }
                    }
                }};
}