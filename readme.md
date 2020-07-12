# Setup

### Global Installs

* NodeJS
* Jest
* Postgresql

### Local installs
* Run npm install to install all packages
* Environment variables go into a root level .env document which you'll have to create

### Data
* restore postgre db locally
1) create backup from live todo (can use pgadmin)
2) cmd -> C:\Windows\System32\cmd.exe
3) createdb -p 5433 -T template0 todo 
4) pg_restore -p 5433 --no-owner --role=owner2 -d todo [PATH TO LOCAL BACKUPS]/[FILE NAME]

# Running locally
* Run 'npm test' to run unit tests
* Run 'npm start' to perform webpack build and start server running on localhost:8080

# Deployment
* Run unit tests, not automated yet
* Run API integration tests, not automated yet
* Deploy via heroku

# Live Environment
https://to-do-vanilla.herokuapp.com/items/
