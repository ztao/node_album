#!/bin/bash
echo "Creat metadata for an album"
echo "-------------------------------------"
echo 'curl "http://127.0.0.1:3000/album/2/photo/1"'
echo "-------------------------------------"
echo 'curl Metadata[Description]="New metadata" -F Metadata[Create]="BOMB" "http://127.0.0.1:3000/album/2/photo/1/metadata"'
echo "-------------------------------------"
echo 'curl "http://127.0.0.1:3000/album/2/photo/1metadata"'