//first backbone model!!
var Blog = Backbone.Model.extend({
	defaults: {
		author: '', 
		title: '',
		url: ''
	}
});

//first collection!! (array of models)
var Blogs = Backbone.Collection.extend({});

//instantiate two Blogs
var blog1 = new Blog({
	author: "marco",
	title: "marco's blog",
	url: "http://mcardacci.github.io"
})

var blog2 = new Blog({
	author: "John",
	title: "John's blog",
	url: "http://www.johnsblog.com"
});

//instantiate a collection
var blogs = new Blogs([blog1, blog2]);