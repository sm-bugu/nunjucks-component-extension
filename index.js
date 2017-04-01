"use strict";

const nunjucks = require('nunjucks');
const fs = require('fs');

class ComponentExtension {

    constructor() {
        this.tags = ['component'];
    }

    parse(parser, nodes) {
        const tok = parser.nextToken();
        const args = parser.parseSignature(null, true); 

        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtension(this, 'run', args);
    }

    run(context, data, args) {
        if (typeof args === 'undefined') {
            args = data;
            data = undefined;
        }

        let result = '';
        let file = args.file;

        try {
            result = nunjucks.render(file, data);
        } catch(e) {
            if(e.message.indexOf('template not found') > -1) {
                result = '404, file not found';
            } else {
                result = e.message;
            }

            console.error('"' + file + '" 不存在, 请写相对于项目的路径。如：shortcuts/xxxxxxxxxx');
        }

        return new nunjucks.runtime.SafeString(result);
    }
}

module.exports = new ComponentExtension();
