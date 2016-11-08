nunjucks-component-extension
----

nunjucks plugin for pass data

index.html:

```html
<html>
<head>
	<title>test component</title>
</head>
<body>
	{%
		set obj = {
			name: 'Michael',
			corp: 'Alibaba',
			dep: '神马搜索'
		}
	%}

	{% component file="sub.html", obj%}
</body>
</html>
```

sub.html:

```html
<p>姓名： {{name}}</p>
<p>公司： {{corp}}</p>
```