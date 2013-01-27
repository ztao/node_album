#!/bin/bash
echo "Add a comment for a photo"
echo "----------------------------------------------------------------"
echo "Before Created (Album Name is default)" 
echo `curl http://127.0.0.1:3000/album/2/photo/1/comments`
echo "----------------------------------------------------------------"
echo `curl -F Comment="I prefer F117!" "http://127.0.0.1:3000/album/2/photo/1/comments"`
echo "After Created"
echo "----------------------------------------------------------------"
echo `curl "http://127.0.0.1:3000/album/2/photo/1/comments"`