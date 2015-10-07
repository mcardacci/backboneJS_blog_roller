# Mighty Blog Aggregator
=========================

## Dependencies:
* Backbone.js 1.2.1
* MongoDB 3.0.5
* Mongoose 4.1.3
* Express 4.13.3
* Body-Parser 1.13.3


## Setup
* Install brew [here](http://brew.sh/)
* Install node JS [here](https://nodejs.org/download/)
* Install npm (node package manager) [here](http://blog.npmjs.org/post/85484771375/how-to-install-npm)
* Install mongoose by going into terminal and typing:
```
npm install mongoose
```
* Install Express by typing this into terminal:
```
npm install express
```
* Install Body-Parser by typing this into terminal:
```
npm install body-parser
```
* Navigate [here](https://www.mongodb.org/downloads) to download the MongoDB database.
..* In order to be able to write to Mongodb you need to change it's permissions.

1. Go back into terminal and type ``` cd /data ```
2. ``` ls -ld /data/db ``` It should say "drwxr-xr-x"
3. Change the access rights: ``` sudo chmod 0755 /data/db ```
4. ``` sudo chown -R $USER/data/db ```
5. Run ``` mongod ``` to verify that it works

## Run the app and have fun
1. Open three terminal windows
2. In the third type ``` mongod ```
3. In the second type ``` mongo ```
4. In the first window type ``` node server ```
5. Navigate to localhost:3000 in your browser and enjoy THE MIGHTY BLOG AGGREGATOR.

