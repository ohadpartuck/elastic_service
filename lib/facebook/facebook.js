//index name - identities
//tag name - facebook_data

var extend = require('util')._extend

exports.create_or_update = function (app, req, callback) {
    var elastic_client = app.get('elastic_search_client'),
        merged_data;

    merged_data = extend({index: 'identities', type: 'social_data'}, req.body['social_data']);
    elastic_client.index(merged_data, function (err, resp) {
        console.log("res" + JSON.stringify(resp));
        console.log("err" + JSON.stringify(err));
        callback({'result': resp});
    });
};