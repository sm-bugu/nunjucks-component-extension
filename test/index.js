const path = require('path');
const assert = require('assert');

const nunjucks = require('nunjucks');
const env = new nunjucks.configure(path.join(__dirname, 'tmpl'));
env.addExtension('ComponentExtension', require('..'));

describe('ComponentExtension 单元测试', function() {
	it('传递 data 正常渲染', function(done) {
		nunjucks.render('index.html', function(err, str) {
			assert.equal(str, '<html>\n<head>\n\t<title>test component</title>\n</head>\n<body>\n\t\n\n\t<p>姓名： Michael</p>\n<p>公司： Alibaba</p>\n</body>\n</html>');
			done();
		});
	});

	it('不传递 data 不报错', function(done) {
		nunjucks.render('none.html', function(err, str) {
			assert.equal(str, '<html>\n<head>\n\t<title>test component</title>\n</head>\n<body>\n\t<p>姓名： </p>\n<p>公司： </p>\n</body>\n</html>');
			done();
		});
	});
});
