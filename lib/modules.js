import nunjucks from 'nunjucks';
import {modOutTpl} from './varables';
export default new class{
    constructor(){
        this.mods = [];
    }
    getModCount(){
        return this.mods.length;
    }
    push(newMod){
        let mods = this.mods;
        if(mods.every((value)=>{
            return value.id !== newMod.id;
        })){
            mods.push(newMod);
        }
    }
    isModExist(id){
        let mods = this.mods;
        return mods.some((value)=>{
            value.id = id;
        })
    }
    outPutMods(){
        let mods = this.mods;
        return mods.reduce((preRet,value,index,arr)=>{
            return preRet + nunjucks.renderString(modOutTpl,value);
        },'')
    }
    empty(){
        this.mods.splice(0,this.mods.length);
    }
}