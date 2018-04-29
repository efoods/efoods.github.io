import path from 'path';
import fs from 'fs';
var moduleMap = [];
moduleMap.pushMod = function (modName){
    let moduleId = '$_$' + this.length.toString().padStart(10, 0);
    //如果没有重名的
    // console.log(this,modName);
    modName = modName.replace(/\\/g,'/').trim();
    if(this.some((value,index,arr)=>{
        let elem = value||{};
        // console.log(elem,modName)
        if(elem.name.trim() === modName){
            moduleId = elem.id;
            return true;
        }
        return false;
    })){
        return moduleId;
    }
    this.push({
        id:moduleId,
        name:modName
    })
    return moduleId;
}

moduleMap.findModuleAbsolutePath = (baseDir , matchStr , exts ,dExt ,nodeModAbsolutePath)=>{
    let content='',modAbsolutePath = '',modAbsoluteDir='',modName='',requiredName='';
    let ext = path.extname(matchStr);
    //后缀名为空 或不被允许出现的后缀名 均视为 无后缀名
    if(ext===''||exts.every((value)=>{
        return value != ext;
    })){
        requiredName = matchStr + dExt;
        modAbsolutePath = path.join(baseDir ,requiredName);
        //相对于当前文件目录查找 若存在文件 找到文件 返回绝对路径 
        if(fs.existsSync(modAbsolutePath)){
            modAbsolutePath = modAbsolutePath;
        //若不存在 
        }else{
            //进入 node 模块查找 （查找是否存在 路径为 node_module/requireName 的文件） 
            // 找到文件 返回绝对路径
            modAbsolutePath = path.join(nodeModAbsolutePath,requiredName);
            if(fs.existsSync(modAbsolutePath)){
                modAbsolutePath = modAbsolutePath;
                // 如果未找到 尝试读取 matchStr 下的 package.json文件
            }else{
                const packagePath  = path.join(nodeModAbsolutePath ,matchStr , 'package.json');
                let   packageJson = {};
                if(fs.existsSync(packagePath)){
                    packageJson = JSON.parse(fs.readFileSync(packagePath,'utf8'));
                    let entry = packageJson.main || 'index.js';
                    modAbsolutePath = path.join(nodeModAbsolutePath ,matchStr ,entry);
                    if(fs.existsSync(modAbsolutePath)){
                        modAbsolutePath = modAbsolutePath;
                    }else{
                        const basename = path.basename(matchStr);
                        modAbsolutePath = path.join(nodeModAbsolutePath ,matchStr ,basename+'.js');
                        if(fs.existsSync(modAbsolutePath)){
                            modAbsolutePath = modAbsolutePath;
                        }else{
                            return false;
                        }
                    }
                }else{
                    return false;
                }
            }
        }
    //有扩展名
    }else{
        requiredName = matchStr;
        modAbsolutePath = path.join(baseDir ,requiredName);
        //相对于当前文件目录查找 若存在文件 找到文件 返回绝对路径 
        if(fs.existsSync(modAbsolutePath)){
            modAbsolutePath = modAbsolutePath;
        //若不存在 
        }else{
            //进入 node 模块查找 （查找是否存在 路径为 node_module/requireName 的文件） 
            // 找到文件 返回绝对路径
            modAbsolutePath = path.join(nodeModAbsolutePath,requiredName);
            if(fs.existsSync(modAbsolutePath)){
                modAbsolutePath = modAbsolutePath;
                // 如果未找到 尝试读取 matchStr 下的 package.json文件
            }else{
                const packagePath  = path.join(nodeModAbsolutePath ,matchStr , 'package.json');
                let   packageJson = {};
                if(fs.existsSync(packagePath)){
                    packageJson = JSON.parse(fs.readFileSync(packageJson,'utf8'));
                    entry = packageJson.main || 'index.js';
                    modAbsolutePath = path.join(nodeModAbsolutePath ,matchStr ,entry);
                    if(fs.existsSync(modAbsolutePath)){
                        modAbsolutePath = modAbsolutePath;
                    }else{
                        const basename = path.basename(matchStr);
                        modAbsolutePath = path.join(nodeModAbsolutePath ,matchStr ,basename+'.js');
                        if(fs.existsSync(modAbsolutePath)){
                            modAbsolutePath = modAbsolutePath;
                        }else{
                            return false;
                        }
                    }
                }else{
                    return false;
                }
            }
        }
    }
    content = fs.readFileSync(modAbsolutePath,'utf8');
    modAbsoluteDir = path.dirname(modAbsolutePath);
    return {content,modAbsolutePath,modAbsoluteDir}
}
moduleMap.empty = function(){
    this.splice(0,this.length);
}
export default moduleMap;