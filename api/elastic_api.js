//TODO - here should be stubbed/real by configuration
var Elastic             = require(GLOBAL.ROOT + '/lib/elastic_search/elastic_search.js');
var rabbit              = require(GLOBAL.ROOT + '/lib/rabbit_client/rabbit_client.js');

//NEW Question
//Get Question by ID
//Get Question By Category
//Update a question

exports.create = function(req, res){
    Elastic.create(req, function(final_result) {
        res.json({'result' :  final_result});
    });
};

exports.update = function(req, res){
//    questions.list_top_rated(req, function(final_result) {
        res.json({'result' :  'I am update - updating ...   !'});
//    });
};

exports.delete = function(req, res){
//    questions.list_top_rated(req, function(final_result) {
    res.json({'result' :  'I am delete - eating you!!'});
//    });
};

exports.show = function(req, res){
//    questions.list_top_rated(req, function(final_result) {
    res.json({'result' :  'I am show - whoohoo!'});
//    });
};



