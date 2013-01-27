// Create and Delete entire collections

var fs = require('fs')
, rimraf = require('./rimraf');
var json_file = './resources/collections.json';

exports.entry = function(req,res) {
    // console.log(__dirname);
  	fs.readFile(json_file, 'utf8', function(err, data) { 
    	var collections = JSON.parse(data);
    	var contents = {    		   
		    "Welcome To" : " La Galerie.",
		    "**** HOW TO MANIPULATE ****" : {
		        "Create an album at" : "/album",
		        "Delete an album at" : "/album/[album id]",
		        'Add a photo at' : '/album/[album id]/create',
		        'Replace a photo at' : '/album/[album id]/photo/[photo id]',
		        'Delete a photo at' : '/album/[album id]/photo/[photo id]'
		    },
	    	"**** EXPLORE ALBUMS ****" : {
	    		"Album List" : collections["Album List"]
	    	}
	    };
	    res.json(contents);
	    // res.send(jstoxml.toXML(JSON.parse(contents)));
  	});
};

exports.create = function(req, res) {
	// console.log(req.body)
	var album = req.body.album;
	fs.mkdir('./album/' + album.name, function(err) {
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			if (!album.name) {
				res.send(403, "Forbidden, Must include a name attribute for the album.")
			}
			var album_name = album.name;
			var album_counter = collections.ac;
			album_counter = album_counter + 1;
			collections.ac = album_counter;
			var album_id = album_counter;
			// Store contents into the json file
			collections["Album List"][album_name] = "/album/"+album_id;
			// Create an object for the album
			collections[album_id] = {};
			collections[album_id]["Metadata"] = {};
			collections[album_id]["Comments"] = [];
			collections[album_id]["Image List"] = {};
			collections[album_id]["Metadata"] = {
			"Album Name" : album_name,

			};
			if (req.body.album.description) {
				collections[album_id]["Metadata"]["Description"] = req.body.album.description;
			};

			// Show the entire json
			console.log(JSON.stringify(collections[album_id]));
			// Write the json back to the file
			content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				// res.json(collections);
				res.send(201, 'An album named ' + album_name + ' is created.');
			});
		});
	});	
	
};

exports.retrieve = function(req, res) {
	var album_id = req.params.aid;
	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		var run = false;
		for(var id in collections) {
			if(id === album_id) {
				run = true;
				break;
			};
		};
		if(run) {
			var content = JSON.stringify(collections[album_id]["Image List"], null, '\t')
			res.send(200, content);	
		} else {
			res.send(404, "No such an album.");
		};
	});
};

exports.retrieveAll = function(req, res) {
	var album_id = req.params.aid;
	console.log(album_id)
	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		var run = false;
		for(var id in collections) {
			// console.log(id+"="+album_id);
			if(id === album_id) {
				run = true;
				break;
			};
		};

		if(run) {
			var album_name = collections[album_id]["Metadata"]["Album Name"]
			, image_list = "Explore the image list of "+album_name+" at: "
			, image_list_url = "/album/"+album_id+"/photo"
			, metadata = "Require the metadata of "+album_name+" at: "
			, metadata_url = "/album/"+album_id+"/metadata"
			, comments = "Require the comments of "+album_name+" at: "
			, comments_url = "/album/"+album_id+"/comments";
			
			var album_manipulation = {
				image_list : image_list_url,
				metadata : metadata_url,
				comments : comments_url
			};
			contents = {
				"**** HOW TO MANIPULATE ****" : {
					"Add a photo at": "/album/"+album_id+"/create",
    				"Replace a photo at": "/album/"+album_id+"/photo/[photo id]",
    				"Delete a photo at": "/album/"+album_id+"/photo/[photo id]",
					"Add replace or delete a metadata at" : "/album"+album_id+"/metadata",
					"Add a comment at" : "/album"+album_id+"/comments",
					"Replace or delete a comments at": "/album/"+album_id+"/comments/[comment id]"
				},
				"Explore the contents of the album" : album_manipulation
			};
			res.json(contents);
		} else {
			res.send(404, "No such an album.");
		};
	});
};

exports.delete = function(req, res) {
	var album_id = req.params.aid;
	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		var album_name = collections[album_id]["Metadata"]["Album Name"];
		// Delete corresponding json attributes of the album.
		delete collections[album_id];
		delete collections["Album List"][album_name];

		var content = JSON.stringify(collections, null, '\t')

		fs.writeFile(json_file, content, function(err, data) {
			rimraf('./album/' + album_name, function(err) {
				res.send(202, 'The album has been deleted.');
			});
		});

	});

};

exports.showAlbumList = function(req, res) {
	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		res.json(collections["Album List"]);
	});	
};
