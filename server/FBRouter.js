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
  DBmanager.insertUserData(
    req.body.form_id,
    JSON.stringify(req.body.user_data)
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
