var whereToSearch       = {_index: 'sanger', _type: 'users'};
var whatToSearch        = [
    'id',
    'name',
    'gender',
    'location'
];

exports.get = function (req, callback){
    genericSearch(req, callback, whatToSearch, whereToSearch);
};

exports.create = function (req, callback) {
    genericElasticCreate(req, callback, whereToSearch, 'data');
};

exports.update = function (req, callback) {
    genericElasticUpdate(req, callback, whereToSearch, 'data');
};

exports.delete = function (req, callback) {
    genericElasticDelete(req, callback);
};
