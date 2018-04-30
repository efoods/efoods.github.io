import gulp from 'gulp';
// import babel from 'gulp-babel';
// import uglify from 'gulp-uglify';
import trans from './transform';
import pack from './pack';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import uglify from 'uglify-js';
import browserSync from 'browser-sync';
const browser = browserSync.create();
gulp.task('transform',()=>{
   gulp.src(['es6/index.js'])
    //    .pipe(babel())
       .pipe(trans({isMod:true}))
       .on('error',function(){
           this.emit('end')
       })
    //    .pipe(uglify())
    //    .pipe(concat('index.js'))
       .pipe(pack())
       .pipe(rename({extname:'.js'}))
       .pipe(gulp.dest('./dist'))
})
gulp.task('refreshBrowser',()=>{
    // browser.init({
    //     proxy:'http://172.30.5.31/',
    //     browser:'chrome',
    //     port:80
    // })
})
gulp.task('watch',()=>{
    gulp.watch(['es6/**/*'],['transform'])
        .on('change',(e)=>{
        //    browser.reload();
           console.log(e.path + ' '+new Date); 
        });
    // gulp.watch('./mod-load.js',(e)=>{
    //     try{
    //         gulp.src(e.path)
    //             .pipe(trans({isMod:false}))
    //             .pipe(rename('load.js'))
    //             .pipe(gulp.dest('./'))
    //     }catch(e){
            
    //     }
    // }).on('change',(e)=>{
    //     console.log(e.path + ' '+new Date); 
    //  });
})
gulp.task('DEBUG',['transform','refreshBrowser','watch']);
gulp.task('test',()=>{
   console.log(uglify.minify('var aLaofas = function(abc ,def ){ var masd= "dadsas";function ddd(){};return ddd()+ abc+def+masd;}',{
       output:{
           comments:false,
           beautify:true,
        //    preserve_line:true,
        },
       mangle:{
            toplevel:false,
            reserved:['']
       },
       compress:false
    }).code)
})
gulp.task('default',['DEBUG'])