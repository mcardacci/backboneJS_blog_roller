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

//backbone view for one blog
var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('blogs-list-template').html());
  },
  render: function() {
    this.$el.html(this.template( this.model.toJSON() ))
  }
});

//backbone view for all blogs
var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function() {
    this.model.on('add', this.render(), this);
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray, function(blog) {
      self.$el
    })
  }
});
















