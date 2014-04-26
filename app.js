GLOBAL.ROOT             = __dirname;
var env                 = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

console.log(GLOBAL.ROOT);
console.log(env);

var express             = require('express'),
    namespace           = require('express-namespace'),
    http                = require('http'),
    app                 = express();

http.createServer(app).listen(9001, function(){
    console.log('Express server on port 9001 Ready to Rock!');
});

require('./init/app_setup')(app, env, express);
require('./init/routes_setup')(app);


