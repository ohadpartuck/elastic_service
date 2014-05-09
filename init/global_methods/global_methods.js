
elasticCrudCallback = function(err, resp, callback){
    console.log('response from elastic ' + JSON.stringify(resp));
    if (err !== undefined)  console.log('error from elastic ' + JSON.stringify(err));
    callback({'result': resp, 'error': err});
};

createCallback = function(result){
    crudCallback('create', result);
};

updateCallback = function(result){
    crudCallback('update', result);
};

deleteCallback = function(result){
    crudCallback('delete', result);
};

crudCallback = function(action , result){
    //send back to products_service
    console.log(action + ' action results from elastic search' + JSON.stringify(result));
};

require('./elastic_methods');
require('./helper_methods');
require('./routes_methods');