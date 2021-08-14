const mssql = require("mssql");

const hr = require("../database/hr-sql-server");

module.exports = {
  //GET: /hr/employees
  getAllEmployees(req, res, next) {
    hr.then((pool) => {
      // create Request object
      return pool.query`SELECT * FROM Personal`;
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => res.send(err));
  },

  //GET: /hr/employee/:employeeId
  getEmployee(req, res, next) {
    const employeeId = req.params.employeeId;

    hr.then((pool) => {
      // create Request object
      return pool.query`SELECT * FROM Personal where Employee_ID = ${employeeId}`;
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  },

  //GET: /hr/new-employee
  addNewEmployee(req, res, next) {
    const firstName = "C";
    const lastName = "Nguyen Van";
    const middleInitial = "Abc";
    const address1 = "Da nang";
    const address2 = "a";
    const city = "Da nang";
    const state = "DN";
    const zip = "55000"; //numeric
    const email = "a@gmail.com";
    const socialSecurityNumber = "abc";
    const phoneNumber = "0905053532";
    const gender = true;
    const driversLicense = "abc";
    const maritalStatus = "abc";
    const shareholderStatus = true;
    const benefitPlans = 1; //numeric
    const ethnicity = "abc";

    hr.then((pool) => {
      // create Request object
      return pool
        .request()
        .input("First_Name", firstName)
        .input("Last_Name", lastName)
        .input("Middle_Initial", middleInitial)
        .input("Address1", address1)
        .input("Address2", address2)
        .input("City", city)
        .input("State", state)
        .input("Zip", zip)
        .input("Email", email)
        .input("Phone_Number", phoneNumber)
        .input("Social_Security_Number", socialSecurityNumber)
        .input("Drivers_License", driversLicense)
        .input("Marital_Status", maritalStatus)
        .input("Gender", gender)
        .input("Shareholder_Status", shareholderStatus)
        .input("Benefit_Plans", benefitPlans)
        .input("Ethnicity", ethnicity).query`INSERT INTO Personal(
        First_Name
        ,Last_Name
        ,Middle_Initial
        ,Address1
        ,Address2
        ,City
        ,State
        ,Zip
        ,Email
        ,Phone_Number
        ,Social_Security_Number
        ,Drivers_License
        ,Marital_Status
        ,Gender
        ,Shareholder_Status
        ,Benefit_Plans
        ,Ethnicity)
      VALUES (@First_Name,
        @Last_Name,
        @Middle_Initial,
        @Address1,
        @Address2,
        @City, @State,
        @Zip, @Email,
        @Phone_Number,
        @Social_Security_Number,
        @Drivers_License,
        @Marital_Status,
        @Gender,
        @Shareholder_Status,
        @Benefit_Plans,
        @Ethnicity)`;

      // return pool
      //   .request()
      //   .input("Plan_Name", "abc")
      //   .input("Dec", 5)
      //   .input("Per", 20)
      //   .query`INSERT INTO Benefit_Plans(Plan_name, Deductable, Percentage_CoPay) VALUES (@Plan_name, @Dec, @Per)`;
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  },

  //GET: /hr/update-employee
  updateEmployee(req, res, next) {
    const employeeId = 2;
    const firstName = "D";
    const lastName = "Nguyen Van";
    const middleInitial = "Abc";
    const address1 = "Da nang";
    const address2 = "a";
    const city = "Da nang";
    const state = "DN";
    const zip = "55000"; //numeric
    const email = "ab@gmail.com";
    const socialSecurityNumber = "abc";
    const phoneNumber = "0905053532";
    const gender = true;
    const driversLicense = "abc";
    const maritalStatus = "abcd";
    const shareholderStatus = true;
    const benefitPlans = 1; //numeric
    const ethnicity = "abcd";

    hr.then((pool) => {
      // create Request object
      return pool
        .request()
        .input("Employee_ID", employeeId)
        .input("First_Name", firstName)
        .input("Last_Name", lastName)
        .input("Middle_Initial", middleInitial)
        .input("Address1", address1)
        .input("Address2", address2)
        .input("City", city)
        .input("State", state)
        .input("Zip", zip)
        .input("Email", email)
        .input("Phone_Number", phoneNumber)
        .input("Social_Security_Number", socialSecurityNumber)
        .input("Drivers_License", driversLicense)
        .input("Marital_Status", maritalStatus)
        .input("Gender", gender)
        .input("Shareholder_Status", shareholderStatus)
        .input("Benefit_Plans", benefitPlans)
        .input("Ethnicity", ethnicity).query`UPDATE Personal 
        SET First_Name = @First_Name,
        Last_Name = @Last_Name,
        Middle_Initial = @Middle_Initial,
        Address1=@Address1,
        Address2 = @Address2,
        City= @City,
        State = @State,
        Zip = @Zip, 
        Email = @Email,
        Phone_Number = @Phone_Number,
        Social_Security_Number = @Social_Security_Number,
        Drivers_License =@Drivers_License,
        Marital_Status = @Marital_Status,
        Gender = @Gender,
        Shareholder_Status = @Shareholder_Status,
        Benefit_Plans = @Benefit_Plans,
        Ethnicity = @Ethnicity
        WHERE Employee_ID = @Employee_ID`;
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  },

  //GET: /hr/delete-employee
  deleteEmployee(req, res, next) {
    const employeeId = 4;

    hr.then((pool) => {
      // create Request object
      return mssql.query`DELETE FROM Personal WHERE Employee_ID = ${employeeId}`;
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => res.send(err));
  },
};
