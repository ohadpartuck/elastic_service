module.exports = function(app){
    app.namespace('/v1', function(){
        app.get('/ping', function (req, res) {
            res.json({'result': 'pong'})
        });
    });
};