#!/bin/bash
echo "Delete a comments for an album"
echo "----------------------------------------------------------------"
echo "Before Deleted"
echo `curl "127.0.0.1:3000/album/4/comments"`
echo "----------------------------------------------------------------"
echo `curl -X DELETE "http://127.0.0.1:3000/album/4/comments"`
echo "After Deleted"
echo "----------------------------------------------------------------"
echo `curl "http://127.0.0.1:3000/album/4/comments"`