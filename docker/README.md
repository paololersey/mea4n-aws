# MEAN-APP with docker

A Node app built with MongoDB and Angular and dockerized

## Requirements

- [Node and npm](http://nodejs.org)

## Front-end dev

sudo docker build -t angular-mea4n-aws:dev .
sudo docker run -d --name angular-mea4n-aws -p 4200:8084 angular-mea4n-aws:dev
# eventually to stop and remove
sudo docker stop angular-mea4n-aws
sudo docker rm angular-mea4n-aws

## Full stack

To build frontend for full stack dev:
 - npm run buid

To start the mongodb database
 - sudo service mongod restart

To start the server express for full stack dev:
 - node app

The app is served on 8080 port



