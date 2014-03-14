exports.index = function(req, callback) {
    elasticsearch           = req.app.get('elasticsearch');
    //TODO -params  validations
    name                    = req.query['name'];
    question_id             = req.query['question_id'];
    body                    = req.query['body'];
    title                   = req.query['title'];

    // index a document
    elasticsearch.index({
        index: 'question',
        type: 'tag',
//        id: 1,
        body: {
            name:           name,
            question_id:    question_id,
            body:           body,
            title:          title
        }
    }, function (err, resp) {
        callback("I am create~~~ resp" + resp);
    });

};

exports.search = function(req, callback){
    elasticsearch = req.app.get('elasticsearch');
    query_hash = build_search_hash(req.query);
    console.log('query_hash' + query_hash);
    // search for documents (and also promises!!)
    elasticsearch.search({
        index: 'question',
        type: 'tag',
        size: 50,
        body: {
            query: {
                match: query_hash
            }
        }
    }, function (err, resp) {
        callback("search results " + resp);
    });
//        .then(function (resp) {
////        var hits = resp.body.hits;
//        console.log('body' + resp.body);
//        callback(resp.body);
//    });

//    callback('done');
};


function build_search_hash(search_hash){
    if('tags' in search_hash){
      return {tags: search_hash['tags']}
    }else if('title' in search_hash){
        return {title: search_hash['title']}
    }else if('body' in search_hash){
        return {body: search_hash['body']}
    }
}

