// app.js
var uglify = require('uglify-js');
var web = require('gulp')
let code = uglify.minify('var f = function(){var s1=6,asd=9;s1+=asd;return s1; }',{
    mangle:{
        reserved:['s1']
    },
    compress:false,
    output:{
        beautify :true
  }
})