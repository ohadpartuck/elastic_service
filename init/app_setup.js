module.exports = function(app, env, express){

    var config                 = require('../configuration/' + env + '.json');
    var client                 = require('./elastic_client_setup')(app, config);


    app.set('views', GLOBAL.ROOT + '/views');
    app.set('view engine', 'jade');
    app.set('cfg', config);
    app.set('elastic_search_client', client);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(GLOBAL.ROOT + '/public'));


// development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    GLOBAL.ELASTIC_CLIENT             = client;
};