#!/bin/bash
echo "Delete a comment for a photo"
echo "----------------------------------------------------------------"
echo "Before Deleted"
echo `curl -s "127.0.0.1:3000/album/2/photo/1/comments"`
echo "----------------------------------------------------------------"
echo `curl -s -X DELETE "http://127.0.0.1:3000/album/2/photo/1/comments/1"`
echo "After Deleted"
echo "----------------------------------------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/2/photo/1/comments"`