var extend              = require('util')._extend,
    elastic_client      = GLOBAL.ELASTIC_CLIENT,
    sanger_constants    = GLOBAL.SANGER_CONSTATNTS,
    index_data          = {_index: 'sanger', _type: 'products'};

exports.get = function (req, callback){
    var qryObj = build_query(req);

    search(qryObj, callback);
    return {'result': 'query sent to elastic search'};
};

exports.create = function (req, callback) {

    var doc = req.body[sanger_constants['product_data']];

    elastic_client.index(index_data, doc, function (err, resp) {
                                console.log('response from elastic ' + JSON.stringify(resp));
        if (err !== undefined)  console.log('error from elastic ' + JSON.stringify(err));
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
        if (err) console.log(err);
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
