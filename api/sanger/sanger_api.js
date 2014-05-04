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
                sanger.create(req, createCallback);
                res.json({"result": 'sent to be indexed. we\'ll update once its done'});
            });

            app.post('/:id', function (req, res) {
                sanger.update(req, updateCallback);
                res.json({"result": 'sent to be indexed. we\'ll update once its done'});
            });

            app.delete('/', function (req, res) {
                sanger.delete(req, deleteCallback);
                res.json({"result": 'sent to be deleted. we\'ll update once its done'});
            });
        });
    });
};


function createCallback(result){
    crudCallback('create', result);
}

function updateCallback(result){
    crudCallback('update', result);
}

function deleteCallback(result){
    crudCallback('delete', result);
}

function crudCallback(action , result){
    //send back to products_service
    console.log(action + ' action results from elastic search' + JSON.stringify(result));
}

