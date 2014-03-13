exports.index = function(req, callback) {
    elasticsearch = req.app.get('elasticsearch');
    //TODO -params  validations
    console.log(req.query);
    name = req.query['name'];
    question_id = req.query['question_id'];


    // get the current status of the entire cluster.
//    // Note: params are always optional, you can just send a callback
//    elasticsearch.health(function (err, resp) {
//        if (err) {
//            console.error(err.message);
//        } else {
//            console.dir(resp);
//        }
//    });

    // index a document
    elasticsearch.index({
        index: 'question',
        type: 'tag',
//        id: 1,
        body: {
            name: name,
            question_id: question_id
        }
    }, function (err, resp) {
        callback("I am create~~~ resp" + resp)
        callback("I am create~~~ error " + err)
    });


    var limit  = req.limit || 20;


};

exports.search = function(req, callback){
    elasticsearch = req.app.get('elasticsearch');
    tags = req.query['tags'] ||  'ohad AND ruby';
    // search for documents (and also promises!!)
    elasticsearch.search({
        index: 'question',
        type: 'tag',
        size: 50,
        body: {
            query: {
                match: {
                    tags: tags
                }
            }
        }
    }).then(function (resp) {
//        var hits = resp.body.hits;
        console.log('body' + resp.body);
    });

    callback('done');
};
