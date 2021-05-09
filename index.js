const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const wakeUp = require("./wakeup");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
}).on("error", e => {
    console.log(e);
});

const deathsRouter = require("./routes/deaths");
const completionsRouter = require("./routes/completions");
app.use("/deaths", deathsRouter);
app.use("/completions", completionsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    wakeUp(process.env.HEROKU_URL, 25);
});