#!/bin/bash
echo "Add a comment for a album"
echo "----------------------------------"
echo "Before Create"
echo "----------------------------------"
echo "curl -s http://127/0/0/1:3000/album/1/comments"
echo "----------------------------------"
echo `curl -s -F Comment="A New comment" "http://127.0.0.1:3000/album/1/comments"`
echo "----------------------------------"
echo "After Create"
echo "----------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/1/comments"`