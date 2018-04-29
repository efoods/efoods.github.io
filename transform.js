import through from 'through2';
import path  from 'path';
import fs from 'fs';
import * as babelCore from 'babel-core';
import moduleMap from './lib/moduleMap';
import Mod from './lib/module';
import {requireModExp,mapRxp} from './lib/regexp';
import { nextLine ,modOutTpl } from './lib/varables';
import nunjuncks from 'nunjucks';
import mods from './lib/modules';
import uglify from 'uglify-js';
const defaultOptions = {
        ast:true,
        presets:['es2015','react'],
        // plugins: ["transform-remove-strict-mode"],
        babelrc:false,
        code:true,
        comments:true
    },
    opts = {
        basePath:__dirname,
        entry:'es6/index.js',
        defaultExt:'.js',
        exts:'.js,.es',
        uglify:{
            output:{
                comments:false,
                beautify:true,
             //    preserve_line:true,
             },
            mangle:{
                 toplevel:false,
                 reserved:['typeof']
            },
            compress:false
         }
    }
export default function (options) {
    const extsAllow = opts.exts.split(',');
    const nodeModAbsolutePath = path.join(__dirname,'./node_modules');
    return through.obj(function (file, enc, cb) {
        mods.empty();
        moduleMap.empty();
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        let content = babelCore.transform(file.contents.toString(),defaultOptions || {}).code;
        if(options.isMod!==false){
            let 
                curFilePath = file.history[0],
                curModDir = path.dirname(curFilePath),
                modName = path.relative(opts.basePath, curFilePath),
                newMod = null;
                const encMod =
                    (modContent,mDir)=>{
                      let obj = {};
                      let deps = [];
                      modContent = uglify.minify(modContent,opts.uglify).code;
                    //   console.log(modContent,mDir)
                      obj.code = modContent.replace(requireModExp,function(matchStr){
                            let findResult = moduleMap.findModuleAbsolutePath(mDir,matchStr,extsAllow,opts.defaultExt,nodeModAbsolutePath);
                            findResult.content = babelCore.transform(findResult.content,defaultOptions || {}).code;

                            let depObjResult = encMod(findResult.content,findResult.modAbsoluteDir);

                            let modName = path.relative(opts.basePath,findResult.modAbsolutePath);
                            
                            const depMod = new Mod({
                                id: moduleMap.pushMod(modName),
                                name:modName,
                                deps:depObjResult.deps,
                                code:depObjResult.code,
                                entry:(opts.entry)
                            })
                            mods.push(depMod);
                            deps.push(depMod.id);
                            return depMod.id;
                        })
                        obj.deps = deps;
                        return obj;
                    }
            const objResult = encMod(content,curModDir);
            newMod = new Mod({
                id: moduleMap.pushMod(modName),
                name:modName,
                deps:objResult.deps,
                code:objResult.code,
                entry:(opts.entry)
            });
            mods.push(newMod);
            const strForOutput =JSON.stringify(moduleMap).replace(mapRxp,(res)=>{
                return ',' + nextLine;
            });
            //将模块映射输出到文件   
            fs.writeFile('mods.map',strForOutput, (err) => {
                if (err) throw err;
                // console.log('The file has been saved!');
            });
            // content = nunjuncks.renderString( modOutTpl,newMod);
            content = mods.outPutMods().toString();
        }
        file.contents = new Buffer(content);
        // console.log(JSON.stringify(mods))
        this.push(file);

        cb();
    });
};