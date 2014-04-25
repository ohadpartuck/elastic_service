var facebook = require(GLOBAL.ROOT + '/lib/facebook/facebook.js');

module.exports = function (app) {
    app.namespace('/v1', function(){
        app.put('/new', function (req, res, _) {
            facebook.create_or_update(app, req, create_or_update_callback);
            res.json({"result": 'sent to be indexed. we\'ll update once its done'});
        });
    });
};

function create_or_update_callback(){
    //update the users service that we are done indexing

};