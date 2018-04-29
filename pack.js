import through from 'through2';
import invoke from './lib/invoke';
import nunjucks from 'nunjucks';
import {packTpl} from './lib/varables';
export default function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        const content = file.contents.toString();
        let newContent = nunjucks.renderString(packTpl,{ invoke:invoke.toString() , mods:content.slice(0,-1) });
        file.contents = new Buffer(newContent);
        this.push(file);
        cb();
    });
};