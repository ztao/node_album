#!/bin/bash
echo "Delete a metadata for an album (Name will not be deleted)"
echo "----------------------------------------------------------------"
echo "Before Delete"
echo `curl "http://127.0.0.1:3000/album/4/metadata"`
echo "----------------------------------------------------------------"
echo `curl -X DELETE "http://127.0.0.1:3000/album/4/metadata"`
echo "After Delete"
echo "----------------------------------------------------------------"
echo `curl "http://127.0.0.1:3000/album/4/metadata"`