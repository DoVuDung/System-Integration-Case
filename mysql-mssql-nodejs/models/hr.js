const hrConnector = require("../database/hr-sql-server");

const hr = {
    filterEmployee(sql, callback) {
        hrConnector
            .then((pool) => {
                return pool.query(sql);
            })
            .then((result) => {
                return callback(result);
            })
            .catch((err) => {
                throw new Error(err);
            });
    },

    getAllEmployees(callback) {
        hrConnector
            .then((pool) => {
                return pool.query `SELECT *,
                case
                    when Gender = 1 then N'Nam'
                    else N'Nữ'
                end as gendertest,
                case
                    when Shareholder_Status = 1 then N'Cổ đông'
                    else N'Nhân viên'
                end as congdongtest,
                case
                    when Benefit_Plans = 1 then 'Full-time'
                    when Benefit_Plans = 2 then 'Part-time'
                    else N'Cổ đông'
                end as benefittest

                FROM Personal`;
            })
            .then((result) => {
                return callback(result);
            })
            .catch((err) => {
                throw new Error(err);
            });
    },

    getEmployee(employeeId, callback) {
        hrConnector
            .then((pool) => {
                return pool.query `SELECT * FROM Personal where Employee_ID = ${employeeId}`;
            })
            .then((result) => {
                return callback(result);
            })
            .catch((err) => {
                throw new Error(err);
            });
    },

    addNewEmployee({
            firstName,
            lastName,
            middleInitial = null,
            address1,
            address2 = null,
            city,
            state = null,
            zip = null,
            email,
            socialSecurityNumber = null,
            phoneNumber,
            gender,
            driversLicense = null,
            maritalStatus = null,
            shareholderStatus,
            benefitPlans,
            ethnicity = null,
        },
        callback
    ) {
        hrConnector
            .then((pool) => {
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
                    .input("Ethnicity", ethnicity)
                    .query `INSERT INTO Personal(
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
        @Ethnicity)       
       
        SELECT SCOPE_IDENTITY();
        `;

                // return pool
                //   .request()
                //   .input("Plan_Name", "abc")
                //   .input("Dec", 5)
                //   .input("Per", 20)
                //   .query`INSERT INTO Benefit_Plans(Plan_name, Deductable, Percentage_CoPay) VALUES (@Plan_name, @Dec, @Per)`;
            })
            .then((result) => {
                return callback(result);
            })
            .catch((err) => {
                throw new Error(err);
            });
    },

    updateEmployee({
            employeeId,
            firstName,
            lastName,
            middleInitial,
            address1,
            address2,
            city,
            state,
            zip,
            email,
            socialSecurityNumber,
            phoneNumber,
            gender,
            driversLicense,
            maritalStatus,
            shareholderStatus,
            benefitPlans,
            ethnicity,
        },
        callback
    ) {
        hrConnector
            .then((pool) => {
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
                    .input("Ethnicity", ethnicity).query `UPDATE Personal 
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
                return callback(result);
            })
            .catch((err) => {
                throw new Error(err);
            });
    },

    deleteEmployee(employeeId, callback) {
        hrConnector
            .then((pool) => {
                return pool.query `DELETE FROM Personal WHERE Employee_ID = ${employeeId}`;
            })
            .then((result) => {
                return callback(result);
            })
            .catch((err) => {
                throw new Error(err);
            });
    },
};

module.exports = hr;