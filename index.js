const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

//use heroku's port to use an available one
//this port for the express server (the thing that interacts with react's frontend) 
//it is different from the mongodb server url/port
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test", {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
});

//event: on connect open (only listens once)
//this will now load up all the data on the current server to be used in the front end
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}).on("error", e => {
    console.log("Connection error:", e);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});