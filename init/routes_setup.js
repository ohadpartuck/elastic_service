module.exports = function(app){
                                                  require('../api/main/main_api')(app);
    namespace_require(app, 'social_users');
    namespace_require(app, 'daat');
    namespace_require(app, 'sanger');
};

function namespace_require(app, namespace){
    app.namespace('/'+ namespace   ,
        function(){ require('../api/' + namespace + '/' + namespace + '_api')(app) });
}