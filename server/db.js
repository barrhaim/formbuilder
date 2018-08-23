/**
 * database controller
 */
const sqlite3 = require("sqlite3").verbose();
/**
 * @name create
 * create database and tables if not exist
 */
function create() {
  let db = new sqlite3.Database(
    "./forms.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
      if (err) {
        console.error(err.message);
      }
      console.log("connected to forms db");
    }
  );
  db.serialize(function() {
    db.run(
      "CREATE TABLE IF NOT EXISTS Forms " +
        "( form_id INTEGER PRIMARY KEY AUTOINCREMENT ,form_name varchar(50), form_data TEXT)"
    );
    db.run(
      "CREATE TABLE IF NOT EXISTS FormsData " + "( form_id ,user_data TEXT)"
    );
  });
  db.close(err => {
    if (err) {
      console.error(err.message);
    }
  });
}
/**
 * @name insertForm
 * saves the form template to database
 */
function insertForm(form_name, form_data) {
  let db = new sqlite3.Database(
    "./forms.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  let sql = `INSERT INTO Forms (form_name ,form_data)
                VALUES
                (?,?)`;
  db.serialize(function() {
    db.run(sql, [form_name, form_data], (err, row) => {
      if (err) {
        console.log("insert to forms fails");
        return console.error(err.message);
      }
    });
    db.close(err => {
      if (err) {
        console.error(err.message);
      }
    });
  });
}
/**
 * @name getFormById
 * @param {*} id requested form id
 * @param {*} callback callback to lunch after pool ends (render response to client)
 * get form template by id
 */
function getFormById(id, callback) {
  let db = new sqlite3.Database("./forms.db", sqlite3.OPEN_READWRITE, err => {
    if (err) {
      console.error(err.message);
    }
  });
  let sql = `SELECT  form_name, form_data          
            FROM Forms Where form_id = ? `;

  db.serialize(function() {
    db.all(sql, [id], (err, rows) => {
      if (err) {
        callback(err, false);
      }
      callback(false, rows);
    });
    db.close(err => {
      if (err) {
        console.error(err.message);
      }
    });
  });
}

/**
 * @name getFormDataById
 * @param {*} id the form id of the requested form data
 * @param {*} callback callback to lunch after pool ends (render response to client)
 *  get all filled forms data of the specific index
 */
function getFormDataById(id, callback) {
  let db = new sqlite3.Database("./forms.db", sqlite3.OPEN_READWRITE, err => {
    if (err) {
      console.error(err.message);
    }
  });
  let sql = `SELECT user_data          
            FROM FormsData Where form_id = ? `;

  db.serialize(function() {
    db.all(sql, [id], (err, rows) => {
      if (err) {
        callback(err, false);
      }
      callback(false, rows);
    });
    db.close(err => {
      if (err) {
        console.error(err.message);
      }
    });
  });
}
/**
 * @name insertUserData
 * @param {*} form_id  submited form id
 * @param {*} user_data form data from client
 * insert submited form data to database
 */
function insertUserData(form_id, user_data) {
  let db = new sqlite3.Database(
    "./forms.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  let sql = `INSERT INTO FormsData (form_id ,user_data)
                VALUES
                (?,?)`;
  db.serialize(function() {
    db.run(sql, [form_id, user_data], (err, row) => {
      if (err) {
        console.log("insert to forms data fails");
        return console.error(err.message);
      }
    });
    db.close(err => {
      if (err) {
        console.error(err.message);
      }
    });
  });
}
/**
 * @name getGeneralData
 * @param {*} callback callback to lunch after pool ends (render response to client)
 * general data for all form templates
 */
function getGeneralData(callback) {
  let db = new sqlite3.Database("./forms.db", sqlite3.OPEN_READWRITE, err => {
    if (err) {
      console.error(err.message);
    }
  });
  let sql = `SELECT Forms.form_id,Forms.form_name, count FROM Forms  LEFT JOIN
              (SELECT FormsData.form_id , count(FormsData.form_id) as count from FormsData GROUP BY FormsData.form_id ORDER BY FormsData.form_id) as New
  ON Forms.form_id = New.form_id`;
  db.serialize(function() {
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, false);
      }
      callback(false, rows);
    });
    db.close(err => {
      if (err) {
        console.error(err.message);
      }
    });
  });
}

module.exports = {
  create,
  insertForm,
  getFormById,
  getFormDataById,
  insertUserData,
  getGeneralData
};
