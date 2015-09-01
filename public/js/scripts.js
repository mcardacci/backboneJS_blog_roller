
// Backbone Model

var Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: ''
  }
});
//Changes the backbone 'id' to the Mongo '_id' for ease of calling on
Backbone.Model.prototype.idAttribute = '_id';

// Backbone Collection

var Blogs = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/blogs'
});

// instantiates two Blogs

/*var blog1 = new Blog({
  author: 'Michael',
  title: 'Michael\'s Blog',
  url: 'http://michaelsblog.com'
});

var blog2 = new Blog({
  author: 'John',
  title: 'John\'s Blog',
  url: 'http://johnsblog.com'
});*/

// instantiate a Collection

var blogs = new Blogs();

// Backbone View for one blog

var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.blogs-list-template').html());
  },
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel': 'cancel',
    'click .delete-blog': 'delete'
  },
  edit: function() {
    $('.edit-blog').hide();
    $('.delete-blog').hide();
    this.$('.update-blog').show();
    this.$('.cancel').show();

    var author = this.$('.author').html();
    var title = this.$('.title').html();
    var url = this.$('.url').html();

    this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
    this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
    this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
  },
  update: function() {
    this.model.set('author', $('.author-update').val());
    this.model.set('title', $('.title-update').val());
    this.model.set('url', $('.url-update').val());

    this.model.save(null, {
      success: function(reponse) {
        console.log('Successfully UPDATED blog with _id: ' + reponse.toJSON()._id);
      },
      error: function (response) {
        console.log('Failed to update blog!');
      }
    })
  },
  cancel: function() {
    blogsView.render();
  },
  delete: function() {
    this.model.destroy({
      success: function(response) {
        console.log('Successfully DELETEs blog with _id: ' + response.toJSON()._id);
      },
      error: function() {
        console.log("Failed to DELETE your blog!");
      }
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Backbone View for all blogs

var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function() {
    var self = this;
    this.model.on('add', this.render, this);
    this.model.on('change', function() {
      setTimeout(function() {				//need setTimeout bc title and url update won't register
        self.render();
      }, 30);
    },this);
    this.model.on('remove', this.render, this);

    this.model.fetch({
    	success: function(response) {
        response.toJSON().forEach(function(blog) {
          console.log("You've uploaded a blog with the id of " + blog._id)
        })
    	},
    	error: function() { 
    		console.log("You've done something terribly wrong.")
    	}
    })
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(blog) {
      self.$el.append((new BlogView({model: blog})).render().$el);
    });
    return this;
  }
});

var blogsView = new BlogsView();

$(document).ready(function() {
  $('.add-blog').on('click', function() {
    var blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    });
    $('.author-input').val('');
    $('.title-input').val('');
    $('.url-input').val('');
    blogs.add(blog);

    blog.save(null, {
      success: function(response) {
        console.log('successfully saved blog with _id: ' + response.toJSON()._id);
      },
      error: function() {
        console.log("Failed to SAVE!!");
      }
    });
  });
});