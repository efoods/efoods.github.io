class dataTransfom {
    constructor(data,dataMap) {
        this.oraginalData = ()=>{
            return data;
        }
        this.dataMap = ()=>{
            return dataMap;
        }
        this.getData = (()=>{
            let tar = {};
            let src = this.oraginalData();
            let dataMap = this.dataMap();
            for(let i in dataMap){
                this.mapTo(i,dataMap[i],src,tar);
            }
            return ()=>{
                return tar;
            }
        })()
    }
    mapTo(from,to,src,tar){
        let tkeys = to.split('.') ;
        let fkeys = from.split('.');
        let tmp = tar;
        let ftmp = src;
        //生成目标层级 然后将目标值付给 tmp即可
        //取原始值
        let usedKeys = [];
        for(let i =0 ;i<fkeys.length;i++){
            if(typeof ftmp ==='object'){
                ftmp = ftmp[fkeys[i]];
                usedKeys.push(fkeys[i]);
            }else{
                usedKeys.push(fkeys[i]);
                console.error('src['+usedKeys.join('][')+'] 不存在');
                ftmp = null;
                break;
            }
        }
        for(let i =0 ;i<tkeys.length;i++){
            if(typeof tmp[tkeys[i]] !=='object'){
                if(i>=tkeys.length-1){
                    tmp[tkeys[i]] = ftmp;
                }else{
                    tmp[tkeys[i]] = {};
                    tmp = tmp[tkeys[i]];
                }
            }
        }
    }
    
}
export default dataTransfom;