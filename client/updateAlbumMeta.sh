#!/bin/bash
echo "Update album metadata"
echo "----------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/1/metadata"`
echo "----------------------------------"
echo `curl -s -X PUT "http://127.0.0.1:3000/album/1/metadata" -F Metadata[name]="NEW ALBUM NAME" -F Metadata[Description]="The description has been changed by a PUT method." -F Metadata[Contibuter]="ZZZ"`
echo "----------------------------------"
echo "After Update"
echo "----------------------------------"
echo `curl -s "http://127.0.0.1:3000/album/1/metadata"`