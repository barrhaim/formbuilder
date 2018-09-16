const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4200;
const cors = require("cors");
const FBRouter = require("./FBRouter");
const DBmanager = require("./db");

DBmanager.create();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/builder", FBRouter);
app.listen(PORT, function() {
  console.log("Server is running on Port: ", PORT);
});
