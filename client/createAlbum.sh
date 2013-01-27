#!/bin/bash
echo "Create an album named 'Sports'"
echo "Before"
echo `curl -s "http://127.0.0.1:3000/gallery"`
echo "----------------------------------------------------------------"
echo `curl -s -F album[name]="Sports" -F album[Description]="Show me your favourite sports" "http://127.0.0.1:3000/album"`
echo "----------------------------------------------------------------"
echo `curl -s "http://127.0.0.1:3000/gallery"`