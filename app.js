//TODO - add localization
//TODO - add stub data(to be selected by the global config file).

/**
 * Module dependencies.
 */
GLOBAL.ROOT = __dirname;

//require(GLOBAL.ROOT + '/init/constants.js');

var env                = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

console.log(GLOBAL.ROOT + 'in' + env);

var express             = require('express'),
    elastic             = require(GLOBAL.ROOT + '/api/elastic_api'),
    namespace           = require('express-namespace'),
    elasticsearch      = require('elasticsearch'),
    http                = require('http'),
    path                = require('path');

var cfg                 = require('./configuration/' + env + '.json');
console.log(cfg);

var app                 = express();

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({
    requestTimeout: 1000,
    // undocumented params are appended to the query string
    hello: "elasticsearch!"
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

// Connect to localhost:9200 and use the default settings
//var client = new elasticsearch.Client();

// Connect the client to two nodes, requests will be
// load-balanced between them using round-robin
//var client = elasticsearch.Client({
//    hosts: [
//        'elasticsearch1:9200',
//        'elasticsearch2:9200'
//    ]
//});

// Connect to the this host's cluster, sniff
// for the rest of the cluster right away, and
// again every 5 minutes
//var client = elasticsearch.Client({
//    host: 'elasticsearch1:9200',
//    sniffOnStart: true,
//    sniffInterval: 300000
//});



// Connect to this host using https, basic auth,
// a path prefix, and static query string values
//var client = new elasticsearch.Client({
//    host: 'https://user:password@elasticsearch1/search?app=blog'
//});


// all environments
app.set('port', process.env.PORT || 8010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('cfg', cfg);
app.set('elasticsearch', client);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}



app.namespace('/v1', function(){

    //homepage
    app.get('/', function (req, res) {

    });

    app.namespace('/elastic', function(){
        app.get('/show', elastic.show);
        app.put('/update', elastic.update);
        app.post('/create', elastic.create);
        app.delete('/delete', elastic.delete);
    });

});



http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server on port ' + app.get('port') + ' Ready to Rock!');
});
