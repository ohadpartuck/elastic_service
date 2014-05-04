var sanger = require('../../lib/sanger/sanger');

module.exports = function (app) {
    app.namespace('/v1', function(){
        app.namespace('/products', function(){

            //get all products / a specific product
            app.get('/', function (req, res) {
                //Sync, maybe will be better to do async
                sanger.get(req, res);
//                res.json({"result": 'sent to search, we\'ll call you right back.'});
            });

            app.put('/', function (req, res) {
                sanger.create(req, create_callback);
                res.json({"result": 'sent to be indexed. we\'ll update once its done'});
            });

            app.post('/:id', function (req, res) {
                sanger.create(req, create_callback);
                res.json({"result": 'sent to be indexed. we\'ll update once its done'});
            });

            app.delete('/', function (req, res) {
                sanger.create(req, create_callback);
                res.json({"result": 'sent to be indexed. we\'ll update once its done'});
            });
        });
    });
};


function create_callback(result){
    //send back to products_service
    console.log('create results from elastic search' + JSON.stringify(result));
}

function get_callback(results){
   //send back to products_service
    console.log('get_callback results from elastic search' + JSON.stringify(results));
}