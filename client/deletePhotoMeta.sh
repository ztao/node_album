#!/bin/bash
echo "Delete a metadata for a photo (name will not be deleted)"
echo "----------------------------------------------------------------"
echo "Before Deleted"
echo `curl -s "127.0.0.1:3000/album/2/photo/1/metadata"`
echo "----------------------------------------------------------------"
echo `curl -s -X DELETE "http://127.0.0.1:3000/album/2/photo/1/metadata"`
echo "After Deleted"
echo "----------------------------------------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/2/photo/1/metadata"`