var sanger = require('../../lib/sanger/sanger');

module.exports = function (app) {
    app.namespace('/v1', function(){
        app.namespace('/products', function(){

            //get all products / a specific product
            app.get('/', function (req, res) {
                var results = sanger.get(app, req);
                res.json({"result": results});
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