const request = require("request");
const express = require("express");
const app = express();
const FBRouter = express.Router();
const DBmanager = require("./db");

FBRouter.route("/add").post(function(req, res) {
  DBmanager.insertForm(req.body.form_name, JSON.stringify(req.body.form_data));
  res.json({ status: "request in procsess" });
});

FBRouter.route("/edit/:id").get(function(req, res) {
  const id = req.params.id;
  DBmanager.getFormById(id, (err, rows) => {
    if (!err && rows.length > 0) {
      const to_client = {
        form_data: JSON.parse(rows[0].form_data),
        form_name: rows[0].form_name
      };
      res.json(to_client);
    } else if (err) console.log("get form error row found:" + rows);
  });
});

FBRouter.route("/form").post(function(req, res) {
  console.log("token is:" + req.body.recap);
  request.post(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      form: {
        secret: "6LfuZ3AUAAAAAEr0uujZr48FU02R6aILmndOVm1k",
        response: req.body.recap,
        remoteip: req.connection.remoteAddress
      }
    },
    (err, httpResponse, body) => {
      if (err) {
        console.log("recp error");
        res.send("");
      } else {
        const r = JSON.parse(body);
        if (r.success) {
          DBmanager.insertUserData(
            req.body.form_id,
            JSON.stringify(req.body.user_data)
          );
          res.send("");
        } else {
          console.log("error");
          res.send("");
        }
      }
    }
  );
});

FBRouter.route("/displayformdata/:id").get(function(req, res) {
  const form_id = req.params.id;
  const to_client = {
    user_data: [],
    form_data: [],
    form_name: ""
  };
  DBmanager.getFormDataById(form_id, (err, rows) => {
    if (!err && rows.length > 0) {
      to_client.user_data = rows.map(data => JSON.parse(data.user_data));
      DBmanager.getFormById(form_id, (err, rows) => {
        if (!err && rows.length > 0) {
          (to_client.form_data = JSON.parse(rows[0].form_data)),
            (to_client.form_name = rows[0].form_name);
          res.json(to_client);
        } else if (err) console.log("get form error" + err);
      });
    } else if (err) console.log("get form data error" + err);
  });
});

FBRouter.route("/allforms").get(function(req, res) {
  DBmanager.getGeneralData((err, rows) => {
    if (!err) {
      res.json(rows);
    } else if (err) console.log("countSubmissions error status" + err);
  });
});
module.exports = FBRouter;
