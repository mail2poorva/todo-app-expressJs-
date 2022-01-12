// requirinfg express
const express = require("express");

// my port is running on 8000
const port = 8000;

// mongo db connection
const db = require("./config/mongoose");

// schema of the project
const Task = require("./models/task");

const app = express();

// app.use(express.static("./assets"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded());

//  view engine i.e. ejs
app.set("view engine", "ejs");

// for homepage
app.get("/", (req, res) => {
  Task.find({}, (err, task) => {
    if (err) {
      console.log("Error in fetching task from db");
      return;
    }
    return res.render("index", {
      tittle: "Home",
      task: task,
    });
  });
});

// for creating task in todo
app.post("/create-task", (req, res) => {
  Task.create(
    {
      description: req.body.description,
      category: req.body.category,
      date: dateFormatChange(req.body.date),
    },
    (err, newtask) => {
      if (err) {
        console.log("error in creating task: " + err);
        return;
      }
      return res.redirect("back");
    }
  );
});

// for deleting task done
app.get("/delete-task", (req, res) => {
  var id = req.query;
  console.table(id);

  var count = Object.keys(id).length;
  console.log(Object.keys(id));

  for (let i = 0; i < count; i++) {
    Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        console.log("error in deleting task");
      }
    });
  }
  return res.redirect("back");
});

//  to run on server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server : ${err}`);
  }
  console.log(`Server is running on : ${port}`);
});

//  function for changing date format

function dateFormatChange(dateyear) {
  // array of months
  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // spliting the date

  let arr = dateyear.split("-"); //now we get array of these and we can made in any format as we want
  var num = parseInt(arr[1]) - 1;

  //In dd-monthname-yyyy format
  let newDate = month[num] + " " + arr[2] + "," + arr[0];

  return newDate;
}
