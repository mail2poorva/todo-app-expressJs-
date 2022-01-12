// requiring mongoose
const mongoose = require("mongoose");

//  connecting mongoose to mongodb
mongoose.connect("mongodb://localhost/todos");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting MOngoDB"));

db.once("open", function () {
  console.log("Connected to database");
});

module.exports = db;
