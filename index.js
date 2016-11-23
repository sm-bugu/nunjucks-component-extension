"use strict";

var nunjucks = require('nunjucks');
var fs = require('fs');

function ComponentExtension() {
    this.tags = ['component'];
}

ComponentExtension.prototype = {
    parse: function (parser, nodes) {
        var tok = parser.nextToken(),
            args = parser.parseSignature(null, true);

        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtension(this, 'run', args);
    },

    run: function (context, data, args) {
        if (typeof args === 'undefined') {
            args = data;
            data = undefined;
        }

        var file = args.file;

        if (!fs.statSync(file)) {
            throw new Error('文件不存在，检查是否使用的是相对路径，若是，则要改为相对于模板根目录的路径');
        }

        return new nunjucks.runtime.SafeString(nunjucks.render(file, data));
    }
};

module.exports = new ComponentExtension();
