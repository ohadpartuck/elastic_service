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
    elastic                = require(GLOBAL.ROOT + '/api/elastic_api'),
    namespace           = require('express-namespace'),
    http                = require('http'),
    path                = require('path');

var cfg                 = require('./configuration/' + env + '.json');
console.log(cfg);

var app                 = express();


// all environments
app.set('port', process.env.PORT || 8010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('cfg', cfg);
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
