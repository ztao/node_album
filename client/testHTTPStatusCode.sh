echo "Enter following texts to test HTTP status code:"
echo "----------------------------------------------------------------"
echo "302 Redirecting"
echo 'curl "http://127.0.0.1:3000"'
echo "----------------------------------------------------------------"
echo "curl http://127.0.0.1:3000/album/3"''
echo "405 Method Not Allowed"
echo `curl -X PUT "http://127.0.0.1:3000/album/2/photo/100" -F image=@"../test_pictures/gun.jpg"`
