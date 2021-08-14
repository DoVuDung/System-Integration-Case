const pr = require("../database/pr-my-sql");

module.exports = {
  //GET: /pr/employees
  getAllEmployees(req, res, next) {
    pr.getConnection((err, connection) => {
      if (err) throw err;

      connection.query("SELECT * FROM employee", (err, result, fields) => {
        if (err) throw err;
        res.send(result);
      });
    });
  },

  //GET: /pr/employees/:idEmployee
  getEmployee(req, res, next) {
    const idEmployee = req.params.idEmployee;

    pr.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        `SELECT * FROM employee WHERE idEmployee = ${idEmployee}`,
        (err, result, fields) => {
          if (err) {
            return res.send(err);
          }

          if (result.length == 0) {
            return res.send({
              message: "Not found employee!",
            });
          }
          res.send(result);
        }
      );
    });
  },

  //POST: /pr/new-employee
  addNewEmployee(req, res, next) {
    pr.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        "INSERT INTO employee(Employee_Number, idEmployee, Last_Name, First_Name, SSN, Pay_Rate, Payrates_id, Vacation_Days, Paid_To_Date, Paid_Last_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [3, 3, "A", "Nguyen", "3242", 3, 1, 10, 99, 99],
        (err, result, fields) => {
          if (err) {
            return res.send(err);
          }

          res.send(result);
        }
      );
    });
  },

  //PUT: /pr/employees (update)
  updateEmployee(req, res, next) {
    const idEmployee = 3;

    pr.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        `SELECT * FROM employee WHERE idEmployee = ${idEmployee}`,
        (err, result) => {
          if (result.length == 0) {
            return res.send({ message: "Not found employee!" });
          }

          connection.query(
            `UPDATE employee SET Employee_Number = ?, Last_Name = ?, First_Name = ?, SSN = ?, Pay_Rate =? , Payrates_id = ?, Vacation_Days = ?, Paid_To_Date  = ?, Paid_Last_Year = ? WHERE idEmployee = ${idEmployee}`,
            [3, "B", "Nguyen", "3242", 3, 5, 11, 99, 99],
            (err, result, fields) => {
              if (err) {
                return res.send(err);
              }
              res.send(result);
            }
          );
        }
      );
    });
  },

  //DELTE: /pr/employees
  deleteEmployee(req, res, next) {
    const idEmployee = 3;

    pr.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        `SELECT * FROM employee WHERE idEmployee = ${idEmployee}`,
        (err, result) => {
          if (result.length == 0) {
            return res.send({ message: "Not found employee!" });
          }

          connection.query(
            `DELETE FROM employee WHERE idEmployee = ${idEmployee}`,
            (err, result, fields) => {
              if (err) {
                res.send(err);
              }
              res.send(result);
            }
          );
        }
      );
    });
  },
};
