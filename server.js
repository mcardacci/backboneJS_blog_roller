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

// var blog = new Blog({
//  author: "Marco",
//  title: "Marco's Blog",
//  url: "http://marcosblog.com"
// });

// blog.save();

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//ROUTES!!!!

app.get('/api/blogs', function(req, res) {
  Blog.find(function(err, docs) {
    docs.forEach(function(item) {
      console.log("recieved a GET request for _id" + item._id);
    })
    res.send(docs);
  });
});


var port = 3000;

app.listen(port);
console.log('server on ' + port);

//NOTES
//once you have node server, mongod and mongo running in terminal, here are some commands:
//show dbs - Gives you list of tables
//use blogroll \n show collections
//db.blogs.find().pretty() - shows a prettified version of table rows