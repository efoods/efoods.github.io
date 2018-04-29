const invoke = function(modules){
    // window.process= {env:{NODE_ENV : "s"}};
    var installedMods = {};
    var require = function(mid){
        if(installedMods[mid]){
            return installedMods[mid];
        }
        installedMods[mid] = modules[mid](require);
        return installedMods[mid];
    }
    require(modules['entry']);
}
export default invoke;