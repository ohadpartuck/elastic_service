var        global_constants         = require('global_constants');

module.exports = function(app, env, express){

    var config                 = require('../configuration/' + env + '.json');
    var client                 = require('./elastic_client_setup')(app, config);

    app.use(express.bodyParser());      //to get params in req.body
    app.use(app.router);

    GLOBAL.ELASTIC_CLIENT       = client;

    GLOBAL.SANGER_CONSTATNTS    = global_constants['sanger']['sanger_constants'];

};