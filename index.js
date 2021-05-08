const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/test", {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}).on("error", e => {
    console.log("Connection error:", e);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});