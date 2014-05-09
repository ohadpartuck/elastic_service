var extend              = require('util')._extend;

gatherInput = function (req, whereToSearch, inputDataField){
    var doc     = req.body[inputDataField],
        bson_id = req.body[MAIN['bson_id']];
    var options = extend(whereToSearch, {_id: bson_id});

    return {options: options, doc: doc};
};

//todo - build more complicated queries here. fuzzy search, match search, regex search.
buildQuery = function(req){
    var searchObj  = req.query;
    var searchTerm = queryObjectToElasticSearchTerm(req.query);

    if (searchTerm === undefined) return { match_all : {} };

    switch(searchObj[MAIN['search_type_field']]) {
        case MAIN['start_with_search_type']:
            return startWithQuery(searchObj);
        case MAIN['regex_search_type']:
            return startWithQuery(searchObj);
        default:
            return buildRegularQuery(searchTerm);
    }
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

function buildRegularQuery(searchTerm){
    return {filtered: {
        query: {
            query_string: {
                query: searchTerm
            }
        }
    }};
}

function startWithQuery(searchObj){
    var start_with_field    = searchObj[MAIN['start_with_field']],
        starts_with         = searchObj[MAIN['starts_with']],
        max_expansions      = searchObj[MAIN['max_expansions']];

    var query = {};
    query[start_with_field] = {
        query: starts_with,
        max_expansions: max_expansions
    };
     return {match_phrase_prefix: query};
}
