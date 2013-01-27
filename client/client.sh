#!/bin/bash

# Entry Point
# curl http://127.0.0.1:3000/album

# Create collections
# echo `curl -s -F album[name]="First Album" -F album[description]="this is a test album" "http://127.0.0.1:3000/album"`
# echo `curl -s -F album[name]="Armament" -F album[description]="About armament" "http://127.0.0.1:3000/album"`
# echo `curl -s -F album[name]="Plant" -F album[description]="About plant" "http://127.0.0.1:3000/album"`

# Delete collections
# echo `curl -X DELETE "http://127.0.0.1:3000/album/1"`
# echo `curl -X DELETE "http://127.0.0.1:3000/album/2"`
# echo `curl -X DELETE "http://127.0.0.1:3000/album/3"`

# Create an image
# echo `curl -s -F image=@"../test_pictures/f22.jpg" --form press=OK "http://127.0.0.1:3000/album/2/create"`
# Update an image
# echo `curl -X PUT "http://127.0.0.1:3000/album/2/photo/3" -F image=@"../test_pictures/gun.jpg"`
# Delete an image
# echo `curl -X DELETE "http://127.0.0.1:3000/album/2/photo/1"`

# CRUD metadata for albums
# Create
# echo `curl -F Metadata[name]="First Album" -F Metadata[Description]="this is a test album 3" -F Metadata[Contibuter]="Johnny" "http://127.0.0.1:3000/album/1/metadata"`
# Retrieve
# echo `curl http://127.0.0.1:3000/album/1/metadata`
# Update
# 405
# echo `curl -X PUT "http://127.0.0.1:3000/album/3/metadata" -F Metadata[Description]="The description has been changed by a PUT method." -F Metadata[Contibuter]="Johnny"`
# 201
# echo `curl -X PUT "http://127.0.0.1:3000/album/3/metadata" -F Metadata[name]="Plants" -F Metadata[Description]="The description has been changed by a PUT method." -F Metadata[Contibuter]="Johnny"`
# Delete
# echo `curl -X DELETE "http://127.0.0.1:3000/album/2/metadata"`
#CRUD comments for albums
# Post a comment
# echo `curl -F Comment="This is a comment for the album." "http://127.0.0.1:3000/album/1/comments"`
# Retrieve
#
#Update
# echo `curl -X PUT -F Comment[2]="Let me update the second comment." "http://127.0.0.1:3000/album/1/comments/2"`
#Delete 
# echo `curl -X DELETE http://127.0.0.1:3000/album/2/comments/4`
# CRUD comments for photos
# echo `curl -F Comment="This is a comment for the photo." "http://127.0.0.1:3000/album/1/comments"`
# echo `curl -F Comment="Add a comment for the tank." "http://127.0.0.1:3000/album/2/photo/6/comments"`