#!/bin/bash
echo "To update an image, do the following:"
echo "----------------------------------"
echo "Enter http://127.0.0.1:3000/album/2/photo/6 in a browser"
echo "----------------------------------"
echo 'Type: curl -s -X PUT "http://127.0.0.1:3000/album/2/photo/6" -F image=@"../test_pictures/gun.jpg"'
echo "----------------------------------"
echo "Refresh http://127.0.0.1:3000/album/2/photo/6"