#!/bin/bash
echo "Create metadata for an album"
echo "----------------------------------------------------------------"
echo "Before Created (Album Name is default)"
echo "----------------------------------------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/2/metadata"`
echo "----------------------------------------------------------------"
echo `curl -s -F Metadata[Description]="About various armaments" -F Metadata[Creater]="Johnny" "http://127.0.0.1:3000/album/2/metadata"`
echo "----------------------------------------------------------------"
echo "After Created"
echo "----------------------------------------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/2/metadata"`
