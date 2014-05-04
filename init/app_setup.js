var        global_constants         = require('global_constants'),
           extend                   = require('util')._extend;

module.exports = function(app, env, express){

    var config               = require('../configuration/' + env + '.json');
    var client               = require('./elastic_client_setup')(app, config);

    app.use(express.bodyParser());      //to get params in req.body
    app.use(app.router);

    ELASTIC_CLIENT          = client;

    MAIN                    = global_constants['main'];
    SANGER_CONSTATNTS       = global_constants['sanger']['sanger_constants'];

    globalFunctions();
};

function globalFunctions(){
    search = function (whatToSearch, whereToSearch, elastic_client, qryObj, callback){

        var options = extend(whatToSearch, whereToSearch);

        elastic_client.search(options, {
            query : qryObj
        }, function (err, data) {
            if (err) console.log(err);
            callback.json(data['hits'].hits);
        });
    };

//todo - build more complicated queries here. fuzzy search, match search, regex search.
    buildQuery = function(req){
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
    };

    queryObjectToElasticSearchTerm = function(queryObj){
        var search_term;
        for (var key in queryObj) {
            if (search_term === undefined){
                search_term = key + ':' + queryObj[key];
            }else{
                search_term += 'AND ' + key + ': ' + queryObj[key];
            }
        }
        return search_term;
    };

    elasticCrudCallback = function(err, resp, callback){
        console.log('response from elastic ' + JSON.stringify(resp));
        if (err !== undefined)  console.log('error from elastic ' + JSON.stringify(err));
        callback({'result': resp, 'error': err});
    };
}