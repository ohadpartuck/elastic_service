//TODO - add localization

GLOBAL.ROOT             = __dirname;
var env                 = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

console.log(GLOBAL.ROOT);
console.log(env);

var express             = require('express'),
    namespace           = require('express-namespace'),
    http                = require('http'),
    path                = require('path');

var app                 = express();

require('./init/app_setup')(app, env, express);
require('./init/routes_setup')(app);



http.createServer(app).listen(9001, function(){
    console.log('Express server on port ' + app.get('port') + ' Ready to Rock!');
});

