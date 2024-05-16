# OTT Platform

This project is a simple OTT platform API built with Node.js, Express MongoDB. We can manage users, movies, TV shows, and user lists.

Need NodeJs. My version is v20.13.1
Need MongoDB. (running locally or a connection URI) (My mongodb is running locally)
I installed it using brew on macOS
so to start mongoDB in terminal write ------------ brew services start mongodb-community
and to stop write ------- brew services stop mongodb-community

USE ----- npm install
to install dependencies

ensure mongoDB is running locally on the default port (27017).
If MongoDB is running on a different port or you are using a remote MongoDB instance, update the connection string in src/app.ts.

to run application -------- npm start
to test --------- npm test
for dev envt ---------- npm dev (if nodemon is installed. you wont have to restart server again and again)

To populate database with seed Data
npx ts-node seedData.ts

Use
redis-server 
to start redis server on local, my server is running on port 6379
To access redis client use
redis-cli


You can even use Postman to test API endpoints.
Ensure that you add localhost and port 3000 (in my case) before the routes

API endpoints
# Add to list: POST /mylist/add
expected body {
  "userId": "user-id",
  "itemId": "item-id"
}

# Remove from list: POST /mylist/remove
expected body {
  "userId": "user-id",
  "itemId": "item-id"
}

# List My Items: GET /mylist/list
Query Params:
userId: User ID
page: Page number (default: 1)
limit: Number of items per page (default: 10)


For Performance Optimization Used:
DB indexing
Redis Caching
Pagination


Assumptions:
Assumed that user authentication is handled outside the scope of this assignment, and valid user IDs are provided in the requests.


********** IMPORTANT NOTE *******************

TO ENSURE THE PROJECT WORKS:
Mongo Server should be running
Redis server should be running
All the dependencies must be installed

