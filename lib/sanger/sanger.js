var whereToSearch       = {_index: 'sanger', _type: 'products'},
    productFields       = SANGER_CONSTATNTS['product_fields'];
var whatToSearch        = [ productFields['id'],
                            productFields['name'],
                            productFields['stores_available_in'],
                            productFields['tags'],
                            productFields['locale']
                        ];

exports.get = function (req, callback){
    genericSearch(req, callback, whatToSearch, whereToSearch);
};

exports.create = function (req, callback) {
    genericElasticCreate(req, callback, whereToSearch);
};

exports.update = function (req, callback) {
    genericElasticUpdate(req, callback, whereToSearch);
};

exports.delete = function (req, callback) {
   genericElasticDelete(req, callback); 
};
