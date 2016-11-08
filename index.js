"use strict";

var nunjucks = require('nunjucks');

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
        var file = args.file;

        return new nunjucks.runtime.SafeString(nunjucks.render(file, data));
    }
};

module.exports = new ComponentExtension();