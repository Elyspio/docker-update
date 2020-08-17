#!/bin/bash
host="10.0.50.24"
user="ubuntu"
app_name="docker-update"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

echo "dir $DIR"

cd $DIR

echo "Removing previous building files"
ssh $user@$host "rm -rdf ~/docker-building"

echo "Pushing front files"
ssh $user@$host "mkdir -p ~/docker-building/front"
scp -r $DIR/../../front/build $user@$host:~/docker-building/front/build

echo "Pushing back files"
ssh $user@$host "mkdir -p ~/docker-building/back"
scp -r $DIR/../../back/build $user@$host:~/docker-building/back/build
scp $DIR/../../back/package.json $user@$host:~/docker-building/back/package.json

echo "Pushing ssh files"
ssh $user@$host "mkdir -p ~/docker-building/docker/ssh"
scp -r $DIR/../ssh/* $user@$host:~/docker-building/docker/ssh
ssh $user@$host "bash ~/docker-building/docker/ssh/generate.sh"



scp $DIR/../DockerFile $user@$host:~/docker-building/DockerFile

ssh $user@$host "cd ~/docker-building && docker build -f ./DockerFile . -t elyspio/$app_name:arm64"
ssh $user@$host "docker push elyspio/$app_name:arm64"

ssh $user@$host "mkdir -p /apps/$app_name/"
scp $DIR/docker-compose.yml $user@$host:/apps/$app_name/docker-compose.yml
#ssh $user@$host "cd /apps/$app_name/ && docker-compose up -d"
