var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  author: String,
  title: String,
  url: String
});

mongoose.model('Blog', BlogSchema);

var Blog = mongoose.model('Blog');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//ROUTES!!!! Usually want to put this in different folder. More modular.

app.get('/api/blogs', function(req, res) {
  Blog.find(function(err, docs) {
    docs.forEach(function(item) {
      console.log("recieved GET request for _id" + item._id);
    })
    res.send(docs);
  });
});

app.post('/api/blogs', function(req, res) {
  console.log('Recieved POST req!');
  for (var key in req.body) {
    console.log(key + ": " + req.body[key]);
  }
  var blog = new Blog(req.body);   // Uses body-parser to turn into JSON and retrieve request body
  blog.save(function(err, doc) {
    res.send(doc);
  });
});

app.delete('/api/blogs/:id', function(req, res) {
  console.log('Recieved DELETE request for _id: ' + req.params.id);
  Blog.remove({_id: req.params.id}, function(err) {
    res.send({_id: req.params.id});
  });
});

app.put('/api/blogs/:id', function(req, res) {
  console.log('Received an UPDATE request for _id: ' + req.params.id);
  Blog.update({_id: req.params.id}, req.body, function(err) {
    res.send({_id: req.params.ed});
  });
});
var port = 3000;

app.listen(port);
console.log('server on ' + port);

//NOTES
//once you have node server, mongod and mongo running in terminal, here are some commands for mongo (ORM):
//show dbs - Gives you list of tables
//use blogroll \n show collections
//db.blogs.find().pretty() - shows a prettified version of table rows
