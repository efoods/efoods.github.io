window.require = (()=>{
    return (mod, deps, cb)=>{
        const modules = window.modules;
        return modules[mod]();
    };
})();