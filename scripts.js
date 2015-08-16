//first backbone model!!

var Blog = Backbone.Model.extend({
	defaults: {
		author: '', 
		title: '',
		url: ''
	}
})