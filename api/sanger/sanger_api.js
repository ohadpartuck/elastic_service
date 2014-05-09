var sanger = require('../../lib/sanger/sanger');

module.exports = function (app) {
    app.namespace('/v1/products', function(){
        setupDefaultRoutes(app, sanger);
    });
};

