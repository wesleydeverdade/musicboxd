docker run --name musicbox -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name musicbox -p 27017:27017 -d -t mongo
docker run --name mysqlmusicbox -e MYSQL_ROOT_PASSWORD=docker -d mysql
docker run --name redismusicbox -p 6379:6379 -d -t redis:alpine

docker start pgmusicbox
docker start mongomusicbox
docker start mysqlmusicbox

docker container ps -a

taskkill /F /IM node.exe
