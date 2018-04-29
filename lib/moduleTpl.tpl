function(require){
    var module = { exports:{} },  exports = module.exports;
    (function(){
        {{ __function__ | safe }}
    })()
    return module.exports;
}