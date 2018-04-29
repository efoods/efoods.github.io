(function invoke(modules) {
    // window.process= {env:{NODE_ENV : "s"}};
    var installedMods = {};
    var require = function require(mid) {
        if (installedMods[mid]) {
            return installedMods[mid];
        }
        installedMods[mid] = modules[mid](require);
        return installedMods[mid];
    };
    require(modules['entry']);
})({
$_$0000000000:function(require){
    var module = { exports:{} },  exports = module.exports;
    (function(){
                "use strict";
    })()
    return module.exports;
}
})