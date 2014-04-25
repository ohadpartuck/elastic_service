module.exports = function(app){
                                                      require('../api/main/main_api')(app);
        app.namespace('/social_users'   , function(){ require('../api/social_users/social_users_api')(app) });
        app.namespace('/daat'           , function(){ require('../api/daat/daat_api') });
};