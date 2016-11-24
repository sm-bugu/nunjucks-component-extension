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
        var result = '';
        if (typeof args === 'undefined') {
            args = data;
            data = undefined;
        }

        var file = args.file;

        try {
            result = nunjucks.render(file, data);
        } catch(e) {
            if(e.message.indexOf('template not found') > -1) {
                result = '"' + file + '" 不存在, 请写相对于项目的路径。如：shortcuts/xxxxxxxxxx';
            } else {
                result = e.message;
            }
            
            console.error(result);
        }

        return new nunjucks.runtime.SafeString(result);
    }
};

module.exports = new ComponentExtension();
