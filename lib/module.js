
import nunjucks from 'nunjucks';
import path from 'path';
import {rowChangeExp} from './regexp';
import { nextLine ,modTplPath ,codeLineTpl,indent} from './varables';
class mod {
    constructor(){
        this.mode = 'commonjs';
    }

}
export  default class extends mod{
    constructor({id,name,deps,code,entry,callback}){
        super();
        this.id = id || 0;
        this.deps = deps || null;
        this.name = name || 'unkown';
        this.inst = this.generateModulCode(code||'');
        this.isEntry = path.resolve(name)===path.resolve(entry);
        this.callback = callback||(()=>{});
    }
    generateModulCode(code){
        let tplPath = path.join(__dirname,modTplPath);
        const modCode = nunjucks.render(tplPath,{__function__:this.indent(code)});
        // console.log(modCode);
        return modCode;
    }
    indent(code){
        let codeLines = code.split(rowChangeExp);
        codeLines = codeLines.map((value)=>{
           return  nunjucks.renderString( codeLineTpl ,{indent:indent, oneRowCode :value})
        }).filter((value)=>{
            return value !=='';
        })
        return codeLines.join('\n');
    }
}