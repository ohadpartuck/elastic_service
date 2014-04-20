
//index name - identities
//tag name - facebook_data
module.exports = function (app) {
    var elastic_client = app.get('elastic_search_client');
    app.post('/new', function (req, res, _) {
        res.json({'result': 'indexed a new user data'});
    });
};