// Add, Replace and Delete metadata and comment to a collection
// Add, Replace and Delete metadata and comment to an image in a collection
var photo = require('./photo')
, fs = require('fs');

var json_file = './resources/collections.json';

exports.create = function(req, res) {
	// // Test Code
	// console.log("req.body");
	// console.log(req.body);
	// console.log("--------------------------------");
	// console.log('req.url: ' + req.url);
	// if (req.params.aid) {
	// 	console.log("req.params.aid:");
	// 	console.log(req.params.aid);
	// 	console.log("--------------------------------");
	// } else if (req.params.pid) {
	// 	console.log("req.params.pid");
	// 	console.log(req.params.pid);
	// 	console.log("--------------------------------")
	// } else {
	// 	console.log("req.params");
	// 	console.log(req.params);
	// 	console.log("--------------------------------")
	// }
	// Of Album Comment
	var request_url = req.url
	, album_id = req.params.aid;

	if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") < 0) {
		var metadata = req.body.Metadata;
		var count = 0
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			for(kv in collections[album_id]["Metadata"]) {
				count++;
				if (count >=2) {
					break;
				} else {
					res.send(405, "Metadata has been created already, using PUT to update.")
				};
			};
			var album_name = collections[album_id]["Metadata"]["Album Name"];
			collections[album_id]["Metadata"] = metadata;
			collections[album_id]["Metadata"]["Album Name"] = album_name;
			var content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				// console.log(album_name);
				res.send(201, "The Metadata of " + album_name + " was created." );
			});
		});	
	} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") < 0) {
		// Of Album Comment
		// console.log("Request for creating comment of an album");
		var comment = req.body.Comment;
		var comment_id = req.params.cid + 1;
		// console.log(comment);
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			var comments = collections[album_id]["Comments"];
			comments.push(comment)
			collections[album_id]["Comments"]= comments;
			var album_name = collections[album_id]["Metadata"]["Album Name"];
			var content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				// res.json(collections);
				console.log(album_name);
				res.send(201, "A Comment for " + album_name + " was added." );
			});
		});	

	} else if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") > 0) {
		// TO DO, of Photo Metadata
		var metadata = req.body.Metadata
		, album_id = req.params.aid
		, photo_id = req.params.pid;
		// console.log(metadata);
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			for(kv in collections[album_id]["Metadata"]) {
				count++;
				if (count >= 2) {
					break;
				} else {
					res.send(405, "Metadata has been created already, using PUT to update.")
				};
			};
			var photo_name = collections[album_id][photo_id]["Metadata"]["Photo Name"]
			collections[album_id][photo_id]["Metadata"] = metadata;
			var content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				// res.json(collections);
				res.send(201, "The metadata of " + photo_name + " was changed." );
			});
		});	

	} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") > 0) {
		// TO DO, of Photo Comment

		// console.log("Request for creating comment of a photo");
		var comment = req.body.Comment
		, album_id = req.params.aid
		, photo_id = req.params.pid;
		// console.log(comment);
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			var photo_name = collections[album_id][photo_id]["Metadata"]["Photo Name"]
			collections[album_id][photo_id]["Comments"].push(comment);
			content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				// res.json(collections);
				res.send(201, "A comment for " + photo_name + " was added.");
			});
		});	
	} else {
		res.send(404, "I don't know what are U talking about...")
	}

};

exports.retrieve = function(req, res) {

	var request_url = req.url;

	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") < 0) {
			// Of Album Metadata
			var album_id = req.params.aid;
			// Send json
			res.json(collections[album_id]["Metadata"]);
	        // content = JSON.stringify(collections[album_id]["Metadata"], null, '\t');
	        // res.send(200, content);	

		} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") < 0) {
	        // Of Album Comments
	    	var album_id = req.params.aid;
			var collections = JSON.parse(data);
            content = JSON.stringify(collections[album_id]["Comments"], null, '\t');
            res.send(200, content);

		} else if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") > 0) {
			// Of Photo metadata
	        var album_id = req.params.aid
	    	, photo_id = req.params.pid;
			var collections = JSON.parse(data);
            content = JSON.stringify(collections[album_id][photo_id]["Metadata"], null, '\t');
            res.send(200, content);

		} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") > 0) {
			// Of Photo Comments
	        var album_id = req.params.aid
	    	, photo_id = req.params.pid;
			var collections = JSON.parse(data);
            content = JSON.stringify(collections[album_id][photo_id]["Comments"], null, '\t');
            res.send(200, content);
		} else {
			res.send(404, "Resources Not Found.");
		};
	});
};

exports.update = function(req, res) {

	var request_url = req.url;

	fs.readFile(json_file, 'utf8', function(err, data) {
		var collections = JSON.parse(data);
		if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") < 0) {
			// Of Album Metadata 
	        var metadata = req.body.Metadata
	        , new_album_name = req.body.Metadata.name
	        , album_id = req.params.aid;
			if (metadata.name) {
	            collections[album_id]["Metadata"] = metadata;
	            collections[album_id]["Metadata"]["Album Name"] = new_album_name;	           
	            delete collections[album_id]["Metadata"]["name"];
	            content = JSON.stringify(collections, null, '\t');
				fs.writeFile(json_file, content, function(err) {
					res.send(201, "Update succeed. See at: /album/"+album_id+"/metadata");
				});
			} else {
				res.send(405, "The Metadata need to include a name attribute for the album");
			};
		} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") < 0) {
			// Of Album Comment
	        var comment = req.body.Comment
	      	, album_id = req.params.aid
	      	, comment_id = req.params.cid - 1;
	      	// console.log(comment);
            collections[album_id]["Comments"][comment_id] = comment;
            content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				res.send(201, "Comment "+req.params.cid+" replaced at: /album/"+album_id+"/comments/"+req.params.cid);
			});
		} else if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") > 0) {
			// Of Photo Metadata
	        var metadata = req.body.Metadata
	        , album_id = req.params.aid
	        , photo_id = req.params.pid;
            collections[album_id][photo_id]["Metadata"] = metadata;
            content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				res.send(201, content);
			});
		} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") > 0) {
			// TO DO, of Photo Comment
	        var comment = req.body.Comment
	        , album_id = req.params.aid
	        , photo_id = req.params.pid
	        , comment_id = req.params.cid - 1;
            collections[album_id][photo_id]["Comments"][comment_id] = comment;
            content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				res.send(201, "Comment "+req.params.cid+" replaced at: /album/"+photo_id+"/comments/"+req.params.cid);
			});
		} else {
			res.send(404, "Resources Not Found.");
		};
	});
};

exports.delete = function(req, res) {

	var request_url = req.url;

	if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") < 0) {
		// Of Album Metadata
		var album_id = req.params.aid;
        var metadata = req.body.Metadata;
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			var album_name = collections[album_id]["Metadata"]["Album Name"];
			collections[album_id]["Metadata"] = {
				"Album Name" : album_name
			};

            content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				// res.json(collections);
				res.send(201,"The metadata of " + album_name + " was deleted");
		    });
        });
	} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") < 0) {
		// Of Album Comments
		var album_id = req.params.aid
        , comment_id = req.params.cid - 1;

		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			var album_name = collections[album_id]["Metadata"]["Album Name"];
			var comments = collections[album_id]["Comments"];
			var new_comments = [];
			// console.log(comment_id);
			for(var id =0; id < comments.length; id++) {
				console.log("id: "+id);
				if (id !== comment_id) {
					new_comments = new_comments.concat([comments[id]]);
				};
			};
			// console.log(new_comments);
			collections[album_id]["Comments"] = new_comments;
            var content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				res.send(201,"The comment "+req.params.cid+" of " + album_name + " was deleted");
		    });
        });		
	} else if (request_url.indexOf("metadata") > 0 & request_url.indexOf("photo") > 0) {
		// Of Photo Metadata
		var album_id = req.params.aid;
		var photo_id = req.params.pid;
        var metadata = req.body.Metadata;
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			var photo_name = collections[album_id][photo_id]["Metadata"]["Album Name"]
			collections[album_id][photo_id]["Metadata"] = {
				"Album Name" : photo_name
			};

            content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				res.send(201,"The metadata of " + photo_name + " was deleted");
		    });
        });
	} else if (request_url.indexOf("comments") > 0 & request_url.indexOf("photo") > 0) {
		// Of Photo Comment
		var album_id = req.params.aid
		, photo_id = req.params.pid
		, comment_id = req.params.cid-1;
		fs.readFile(json_file, 'utf8', function(err, data) {
			var collections = JSON.parse(data);
			var photo_name = collections[album_id][photo_id]["Metadata"]["Photo Name"]
			var comments = collections[album_id][photo_id]["Comments"]
			var new_comments = [];
			// console.log(comment_id);
			for(var id =0; id < comments.length; id++) {
				console.log("id: "+id);
				if (id !== comment_id) {
					new_comments = new_comments.concat([comments[id]]);
				};
			};
			collections[album_id][photo_id]["Comments"] = new_comments;
            var content = JSON.stringify(collections, null, '\t');
			fs.writeFile(json_file, content, function(err) {
				res.send(201, "The comment "+req.params.cid+" of "+photo_name+" was deleted");
		    });
        });
	} else {
		res.send(404, "I don't know what are U talking about...")
	}
};
