var sanger          = require('../../lib/sanger/sanger');
var sangerUsers     = require('../../lib/sanger/sanger_users');

module.exports = function (app) {
    app.namespace('/v1/products', function(){
        setupDefaultRoutes(app, sanger);
    });

    app.namespace('/v1/users', function(){
        setupDefaultRoutes(app, sangerUsers);
    });
};

