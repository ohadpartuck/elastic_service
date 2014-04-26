var sanger = require('../../lib/sanger/sanger');

module.exports = function (app) {
    app.namespace('/v1', function(){
        app.namespace('/products', function(){

            //get all products / a specific product
            app.get('/', function (req, res) {
                sanger.get(req, get_callback);
                res.json({"result": 'sent to search, we\'ll call you right back.'});
            });

            app.put('/new', function (req, res) {
                sanger.create(app, req, create_callback);
                res.json({"result": 'sent to be indexed. we\'ll update once its done'});
            });
        });
    });
};

function create_callback(result){
    //send back to products_service

}

function get_callback(results){
   //send back to products_service
    console.log('results from elastic search' + results);
}