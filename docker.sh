docker run --name musicbox -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
docker run --name musicbox -p 27017:27017 -d -t mongo
docker run --name mysqlmusicbox -e MYSQL_ROOT_PASSWORD=docker -d mysql

docker start pgmusicbox
docker start mongomusicbox

docker container ps -a

taskkill /F /IM node.exe
