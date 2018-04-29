


module.exports  = {
    oneLineExp:/.+/g,
    rowChangeExp:/\r\n|\n/g,
    requireModExp : /(?<=require\([\'\"])[^\'\"]+/g,
    mapRxp : /(?<=\}),(?=\{)/g
}