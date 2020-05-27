docker run --name pgmusicbox -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name mysqlmusicbox -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 -d mysql
docker run --name mongomusicbox -p 27017:27017 -d -t mongo
docker run --name redismusicbox -p 6379:6379 -d -t redis:alpine

docker start pgmusicbox
docker start mysqlmusicbox
docker start mongomusicbox
docker start redismusicbox

docker container ps -a

taskkill /F /IM node.exe
