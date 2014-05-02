var extend              = require('util')._extend,
    elastic_client      = GLOBAL.ELASTIC_CLIENT,
    sanger_constants    = GLOBAL.SANGER_CONSTATNTS,
    index_data          = {index: 'sanger', type: 'products'};

exports.get = function (req, callback){
    var qryObj = build_query(req);

    search(qryObj, callback);
    return {'result': 'query sent to elastic search'};
};

exports.create = function (app, req, callback) {

    var merged_data = extend(index_data, req.body[sanger_constants['product_data']]);
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
            'id',
            'locale',
            'name'
        ]
    }, {
        query : qryObj
    }, function (err, data) {
        callback.json(data['hits'].hits);
    });
}

//todo - build more complicated queries here. fuzzy search, match search, regex search.
function build_query(req){
    var searchTerm = queryObjectToElasticSearchTerm(req.query);

    if (searchTerm === undefined) return { match_all : {} };
    else
        return {filtered: {
                    query: {
                        query_string: {
                            query: searchTerm
                        }
                    }
                }};
}

function queryObjectToElasticSearchTerm(queryObj){
    var search_term;
    for (var key in queryObj) {
        if (search_term === undefined){
            search_term = key + ':' + queryObj[key];
        }else{
            search_term += 'AND ' + key + ': ' + queryObj[key];
        }
    }
    return search_term;
}
