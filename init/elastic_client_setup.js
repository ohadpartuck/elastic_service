module.exports = function(app, config){
    var elasticsearch = require('es'),
        config =    {"hosts": [config.elastic_search.conf['host']]};

    return elasticsearch(config);


//    var elastic_search      = require('elasticsearch'),
//        client              = new elastic_search.Client(config.elastic_search.conf);
//
//    client.ping({
//        requestTimeout: 1000,
//        // undocumented params are appended to the query string
//        hello: "elasticsearch!"
//    }, function (error) {
//        if (error) {
//            console.error('elastic_search cluster is down!');
//        } else {
//            console.log('All is well');
//        }
//    });
//
//    return client;
};
