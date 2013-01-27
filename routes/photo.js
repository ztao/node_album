// Add, Replace and Delete an image from a collection

var fs = require('fs');
var json_file = './resources/collections.json';

exports.create = function(req, res) {
	//Post an image
	console.log(req.params);
	console.log(req.body);
  	console.log(req.files.image);

  	var album_id = req.params.aid;
	var image = req.files.image;
	var tmp_path = image.path;
	var photo_name = image.name;

	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		if (album_id > collections.ac) {
			res.send(404, "No such an album.")
		}
		var photo_counter = collections.pc;
		photo_counter = photo_counter + 1;
		collections.pc = photo_counter;
		var photo_id = photo_counter;
		var album_name = collections[album_id]["Metadata"]["Album Name"];
		var target_path = './album/' + album_name + '/' + req.files.image.name;
		collections[album_id]["Image List"][photo_name] = '/album/' + album_id + '/photo/' + photo_id;
		// Create an object of the photo into json file
		collections[album_id][photo_id] = {};
		collections[album_id][photo_id]["Metadata"] = {};
		collections[album_id][photo_id]["Metadata"] = {
			"Photo Name" : photo_name,
			"type" : image.type,
			"size" : image.size,
			"Date" : image.lastModifiedDate
		};

		collections[album_id][photo_id]["Comments"] = [];

		fs.writeFile(json_file, JSON.stringify(collections, null, '\t'), function(err) {
			fs.rename(tmp_path, target_path, function(err) {
				console.log("The file was saved at"+target_path+"!");
	  			res.send(201, 'Photo uploaded');
	    
		    });
		});

	});

};

exports.retrieve = function(req, res) {
	// Get an image
	var photo_id = req.params.pid
	, album_id = req.params.aid;

	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		if (collections[album_id]) {
			if (collections[album_id][photo_id]) {
				var album_name = collections[album_id]["Metadata"]["Album Name"];
				var photo_name = collections[album_id][photo_id]["Metadata"]["Photo Name"];
				var photo_path = './album/' + album_name + '/' + photo_name;
				res.sendfile(photo_path, function(err) {
					res.send(200, "Photo " + photo_name + " from " + album_name + "downloaded");
				});
			} else {
				res.send(404, "No such a photo.")
			}
		} else {
			res.send(404, "No such an album.");
		};
	});	
};

exports.update = function(req, res) {
	// console.log(req.files);
	// console.log(req.body);
	// console.log(req.params);
	// Put an image
	var image = req.files.image;
	var photo_id = req.params.pid
	, album_id = req.params.aid
	, tmp_path = image.path
	, new_photo_name = image.name;

	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		var run = false;
		for(var id in collections){
			if(id === album_id) {
				run = true;
				break;
			}
		}
		if(run) {
			if(collections[album_id][photo_id]) {
				var album_name = collections[album_id]["Metadata"]["Album Name"];
				var photo_name = collections[album_id][photo_id]["Metadata"]["Photo Name"];
				var photo_path = './album/' + album_name + '/' + photo_name;
				var new_photo_path = './album/' + album_name + '/' + new_photo_name;
				collections[album_id][photo_id]["Metadata"]["Photo Name"] = new_photo_name;
				delete collections[album_id]["Image List"][photo_name];
				// console.log(new_photo_name);
				collections[album_id]["Image List"][new_photo_name] = "/album/"+album_id+"/photo_id/"+photo_id;
				fs.writeFile(json_file, JSON.stringify(collections, null, '\t'), function(err) {
					fs.unlink(photo_path, function(err) {
						fs.rename(tmp_path, new_photo_path, function(err) {
					        if (err) throw err;
							else {
				        		console.log("The file was changed!");
				  				res.send(202, 'Photo changed');
				    		};
					    });	
					});		
				});
			} else {
				res.send(405, "No such a photo availabe to be replaced")
			};
		} else {
			res.send(404, "Cannot add a photo to an unexisted album.")
		};
	});	
};

exports.delete = function(req, res) {
	// Delete an image
	var photo_id = req.params.pid
	, album_id = req.params.aid

	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		if(collections[album_id][photo_id]) {
			var album_name = collections[album_id]["Metadata"]["Album Name"];
			var photo_name = collections[album_id][photo_id]["Metadata"]["Photo Name"];
			var photo_path = './album/'+album_name+'/'+photo_name;

			delete collections[album_id][photo_id];
			delete collections[album_id]["Image List"][photo_name];
			fs.writeFile(json_file, JSON.stringify(collections, null, '\t'), function(err) {
				fs.unlink(photo_path, function(err){
					res.send(202, "Photo deleted.");
				});
			});
		} else {
			res.send(405, "No such a photo availabe to be deleted")
		};
	});
};
