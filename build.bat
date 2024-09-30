cd backend
cd interpreter
docker build -t interpreter .
cd ..
cd ml-engine
docker build -t ml-engine .
cd ..
cd http-server
docker build -t http-server .
