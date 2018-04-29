module.exports = {
    nextLine :'\r\n',
    indent :'        ',
    modTplPath:'./moduleTpl.tpl',
    modOutTpl : '{% if isEntry %}entry:"{{id}}",\r\n{% endif %}'+
                '{{id}}:{{inst|safe}},',
    codeLineTpl:'{{indent |safe}}{{oneRowCode |safe}}',
    packTpl :'({{ invoke | safe }})({\n{{ mods |safe }}\n})'
}