 #!/bin/bash
echo "Update a comment for a photo"
echo "----------------------------------------------------------------"
echo "Before Updated (Album Name is default)" 
echo `curl -s "http://127.0.0.1:3000/album/2/photo/6/comments"`
echo "----------------------------------------------------------------"
echo `curl -s -X PUT -F Comment="Let me update the second comment." "http://127.0.0.1:3000/album/2/photo/6/comments/5"`
echo "After Updated"
echo "----------------------------------------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/2/photo/6/comments"`