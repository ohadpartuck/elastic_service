//TODO - here should be stubbed/real by configuration
var Daat             = require(GLOBAL.ROOT + '/lib/daat/daat.js');

//NEW Question
//Get Question by ID
//Get Question By Category
//Update a question

module.exports = function(app){
    app.namespace('/v1', function(){
        app.get('/show', function(req, res){
            Daat.index(req, function(final_result) {
                res.json({'result' :  final_result});
            });
        });
        app.put('/update', function(req, res){
            res.json({'result' :  'I am update - updating ...   !'});
        });
        app.post('/create', function(req, res){
            Daat.search(req, function(final_result) {
                res.json({'result' : final_result});
            });
        });
        app.delete('/delete', function(req, res){
            res.json({'result' :  'I am delete - eating you!!'});
        });
    });
};





