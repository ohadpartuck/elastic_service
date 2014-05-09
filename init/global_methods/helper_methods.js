gatherInput = function (req, whereToSearch){
    var doc     = req.body[sangerConstants['product_data']],
        bson_id = req.body[mainConstants['bson_id']];
    var options = extend(whereToSearch, {_id: bson_id});

    return {options: options, doc: doc};
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
