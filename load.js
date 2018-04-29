"use strict";

window.require = function () {
    return function (mod, deps, cb) {
        var modules = window.modules;
        return modules[mod]();
    };
}();