// A RESTful Web Album

var express = require('express')
  , album = require('./routes/album')  
  , photo = require('./routes/photo')
  , text = require('./routes/text') 
  , fs = require('fs') 
  , http = require('http')
  , path = require('path');

// Where all the data stored
var json_file = './resources/collections.json';

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('metadata',__dirname + '/metadata')
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'album')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
// Redirect to /album
app.get('/', function(req, res){
  res.redirect('/album');
});
// Entry Point
app.get('/album', album.entry);
// Create and Delete entire collections
app.post('/album', album.create);
app.delete('/album/:aid', album.delete);
// Add, Replace and Delete an image from a collection
app.post('/album/:aid/create', photo.create);
app.put('/album/:aid/photo/:pid', photo.update);
app.delete('/album/:aid/photo/:pid', photo.delete);
// Add, Replace and Delete metadata and comments to a collection
app.post('/album/:aid/metadata', text.create);
app.put('/album/:aid/metadata', text.update);
app.delete('/album/:aid/metadata', text.delete);
app.post('/album/:aid/comments', text.create);
app.put('/album/:aid/comments/:cid', text.update);
app.delete('/album/:aid/comments/:cid', text.delete);
// Add, Replace and Delete metadata and comments to an image in a collection
app.post('/album/:aid/photo/:pid/metadata', text.create);
app.put('/album/:aid/photo/:pid/metadata', text.update);
app.delete('/album/:aid/photo/:pid/metadata', text.delete);
app.post('/album/:aid/photo/:pid/comments', text.create);
app.put('/album/:aid/photo/:pid/comments/:cid', text.update);
app.delete('/album/:aid/photo/:pid/comments/:cid', text.delete);
// A Client should be able to retrieve the following from a server:
//
// • The metadata about a single collection
app.get('/album/:aid/metadata', text.retrieve);
// • The comments on a single collection
app.get('/album/:aid/comments', text.retrieve);
// • A list of the images in a collection
app.get('/album/:aid/photo', album.retrieve);
// • An individual image from a collection
app.get('/album/:aid/photo/:pid', photo.retrieve);
// • The metadata about a single image
app.get('/album/:aid/photo/:pid/metadata', text.retrieve);
// • The comments on a single image
app.get('/album/:aid/photo/:pid/comments', text.retrieve);
//
// Get an album with image list, metadata and comments
app.get('/album/:aid', album.retrieveAll);
//
// Handle incorrect URL
app.get('/album/:aid/*', function(req, res) {
  res.send(404, "No resource at /album/"+req.params.aid+"/"+req.params[0]);
});
app.get('/album/:aid/photo/:aid/*', function(req, res) {
  res.send(404, "No resource at /album/"+req.params.aid+"/photo/"+req.params.pid+"/"+req.params[0]);
});
app.get('/gallery', album.showAlbumList);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Web Gallery Server, listening on port " + app.get('port'));
});
