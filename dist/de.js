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
        
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(t) {
            return typeof t;
        } : function(t) {
            return t && typeof Symbol === "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
        
        var _createClass = function() {
            function n(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || false;
                    n.configurable = true;
                    if ("value" in n) n.writable = true;
                    Object.defineProperty(t, n.key, n);
                }
            }
            return function(t, e, r) {
                if (e) n(t.prototype, e);
                if (r) n(t, r);
                return t;
            };
        }();
        
        function _classCallCheck(t, e) {
            if (!(t instanceof e)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        
        var dataTransfom = function() {
            function r(t, e) {
                var a = this;
                _classCallCheck(this, r);
                this.oraginalData = function() {
                    return t;
                };
                this.dataMap = function() {
                    return e;
                };
                this.getData = function() {
                    var t = {};
                    var e = a.oraginalData();
                    var r = a.dataMap();
                    for (var n in r) {
                        a.mapTo(n, r[n], e, t);
                    }
                    return function() {
                        return t;
                    };
                }();
            }
            _createClass(r, [ {
                key: "mapTo",
                value: function t(e, r, n, a) {
                    var o = r.split(".");
                    var f = e.split(".");
                    var i = a;
                    var u = n;
                    var l = [];
                    for (var s = 0; s < f.length; s++) {
                        if ((typeof u === "undefined" ? "undefined" : _typeof(u)) === "object") {
                            u = u[f[s]];
                            l.push(f[s]);
                        } else {
                            l.push(f[s]);
                            console.error("src[" + l.join("][") + "] 不存在");
                            u = null;
                            break;
                        }
                    }
                    for (var c = 0; c < o.length; c++) {
                        if (_typeof(i[o[c]]) !== "object") {
                            if (c >= o.length - 1) {
                                i[o[c]] = u;
                            } else {
                                i[o[c]] = {};
                                i = i[o[c]];
                            }
                        }
                    }
                }
            } ]);
            return r;
        }();
        
        exports.default = dataTransfom;
    })()
    return module.exports;
}
})