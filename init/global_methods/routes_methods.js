setupDefaultRoutes = function(app, appLib){
    var get         = appLib.get;
    var put         = appLib.create;
    var update      = appLib.update;
    var deleteItem  = appLib.delete;

    app.get('/', function (req, res) {
        //Sync, maybe will be better to do async
        get.call(this, req, res);
    });

    app.put('/', function (req, res) {
        put.call(this, req, createCallback);
        res.json({"result": 'sent to be indexed. we\'ll update once its done'});
    });

    app.post('/:id', function (req, res) {
        update.call(this, req, updateCallback);
        res.json({"result": 'sent to be indexed. we\'ll update once its done'});
    });

    app.delete('/', function (req, res) {
        deleteItem.call(this, req, deleteCallback);
        res.json({"result": 'sent to be deleted. we\'ll update once its done'});
    });

};