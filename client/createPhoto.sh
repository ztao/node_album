#!/bin/bash
echo "Upload a photo"
echo "----------------------------------------------------------------"
echo "Before"
echo `curl "http://127.0.0.1:3000/album/5/photo"`
echo "----------------------------------------------------------------"
echo `curl -s -F image=@"../test_pictures/ecs_lab.jpg" --form press=OK "http://127.0.0.1:3000/album/5/create"`
echo 