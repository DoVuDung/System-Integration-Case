// const GeneralInfo = require("../models/gene");
// const hr = require("../models/hr");
// const pr = require("../models/pr");

// const totalIncomeHandler = (sqlFilterHr) => {
//     return new Promise((resolve, reject) => {
//         const employeeIds = [];

//         hr.filterEmployee(sqlFilterHr, (result) => {
//             if (result.recordsets.length > 0) {
//                 result.recordsets[0].forEach((item) =>
//                     employeeIds.push(item.Employee_ID)
//                 );
//             }

//             const sqlPr = `SELECT Paid_To_Date FROM employee WHERE idEmployee IN (
//             ${employeeIds.join(",")})`;

//             //here
//             pr.filterEmployees(sqlPr, (result) => {
//                 let totalIncome;
//                 if (result.length > 0) {
//                     totalIncome = result.reduce(
//                         (total, currItem) => (total += currItem.Paid_To_Date),
//                         0
//                     );
//                 }

//                 if (totalIncome) resolve(totalIncome);
//                 else reject(new Error("Fail!"));
//             });
//         });
//     });
// };

// const totalIncomeHandlerLastYear = (sqlFilterHr) => {
//     return new Promise((resolve, reject) => {
//         const employeeIds = [];

//         hr.filterEmployee(sqlFilterHr, (result) => {
//             if (result.recordsets.length > 0) {
//                 result.recordsets[0].forEach((item) =>
//                     employeeIds.push(item.Employee_ID)
//                 );
//             }

//             const sqlPr = `SELECT Paid_Last_Year FROM employee WHERE idEmployee IN (
//             ${employeeIds.join(",")})`;

//             //here
//             pr.filterEmployees(sqlPr, (result) => {
//                 let totalIncomeLastYear;
//                 if (result.length > 0) {
//                     totalIncomeLastYear = result.reduce(
//                         (total, currItem) => (total += currItem.Paid_Last_Year),
//                         0
//                     );
//                 }

//                 if (totalIncomeLastYear) resolve(totalIncomeLastYear);
//                 else reject(new Error("Fail!"));
//             });
//         });
//     });
// };

// exports.getGeneralInfo = async(req, res, next) => {
//     const generalInfo = await GeneralInfo.find();
//     res.status(200).json(generalInfo);
// };

// exports.updateGeneralInfo = async(req, res, next) => {
//     //totalIncomeShareholders
//     const shareholdersSql = "SELECT Employee_ID FROM Personal WHERE Shareholder_Status = 1"
//     const staffsSql = "SELECT Employee_ID FROM Personal WHERE Shareholder_Status = 0"
//     const menSql = "SELECT Employee_ID FROM Personal WHERE Gender = 1"
//     const womanSql = "SELECT Employee_ID FROM Personal WHERE Gender = 0"
//     const fullTimeSql = "SELECT Employee_ID FROM Personal WHERE Benefit_Plans = 1"
//     const partTimeSql = "SELECT Employee_ID FROM Personal WHERE Benefit_Plans = 2"

//     const totalIncomeShareholders = await totalIncomeHandler(
//         shareholdersSql
//     );
//     const totalIncomeStaffs = await totalIncomeHandler(
//         staffsSql
//     );
//     const totalIncomeMen = await totalIncomeHandler(
//         menSql
//     );
//     const totalIncomeWomen = await totalIncomeHandler(
//         womanSql
//     );
//     const totalIncomeFullTime = await totalIncomeHandler(
//         fullTimeSql
//     );
//     const totalIncomePartTime = await totalIncomeHandler(
//         partTimeSql
//     );

//     const countGeneralInfoDocuments = await GeneralInfo.find().countDocuments();

//     if (countGeneralInfoDocuments === 0) {
//         const generalInfo = new GeneralInfo({
//             totalIncomeShareholders,
//             totalIncomeStaffs,
//             totalIncomeMen,
//             totalIncomeWomen,
//             totalIncomeFullTime,
//             totalIncomePartTime,
//         });

//         await generalInfo
//             .save()
//             .then((result) => res.send(result))
//             .catch((err) => console.log(err));

//         res.send({ message: "Update to date general info" });
//     } else {
//         const generalInfo = await GeneralInfo.findOne();

//         await generalInfo.updateOne({
//             totalIncomeShareholders,
//             totalIncomeStaffs,
//             totalIncomeMen,
//             totalIncomeWomen,
//             totalIncomeFullTime,
//             totalIncomePartTime,
//         });

//         await generalInfo.save();

//         res.json({ message: "Update to date general info" });
//     }
// };

// //them
const GeneralInfo = require("../models/gene");
const hr = require("../models/hr");
const pr = require("../models/pr");

const totalIncomeHandler = (sqlFilterHr, selectedValue) => {
    return new Promise((resolve, reject) => {
        const employeeIds = [];

        hr.filterEmployee(sqlFilterHr, (result) => {
            if (result.recordsets.length > 0) {
                result.recordsets[0].forEach((item) =>
                    employeeIds.push(item.Employee_ID)
                );
            }

            const sqlPr = `SELECT ${selectedValue} FROM employee WHERE idEmployee IN (
            ${employeeIds.join(",")})`;

            pr.filterEmployees(sqlPr, (result) => {
                //bug
                let totalIncome;
                if (result.length > 0) {
                    totalIncome = result.reduce(
                        (total, currItem) => (total += currItem[selectedValue]),
                        0
                    );
                }


                if (totalIncome) resolve(totalIncome);
                else reject(new Error("Fail!"));
            });
        });
    });
};

exports.getGeneralInfo = async(req, res, next) => {
    const generalInfo = await GeneralInfo.find();
    res.status(200).json(generalInfo);
};

const allSql = "SELECT Employee_ID FROM Personal";
const shareholdersSql =
    "SELECT Employee_ID FROM Personal WHERE Shareholder_Status = 1";
const staffsSql =
    "SELECT Employee_ID FROM Personal WHERE Shareholder_Status = 0";
const menSql = "SELECT Employee_ID FROM Personal WHERE Gender = 1";
const womenSql = "SELECT Employee_ID FROM Personal WHERE Gender = 0";
const fullTimeSql = "SELECT Employee_ID FROM Personal WHERE Benefit_Plans = 1";
const partTimeSql = "SELECT Employee_ID FROM Personal WHERE Benefit_Plans = 2";

exports.updateGeneralInfo = async(req, res, next) => {
    const totalIncome = await totalIncomeHandler(allSql, "Paid_To_Date");
    const totalIncomeShareholders = await totalIncomeHandler(
        shareholdersSql,
        "Paid_To_Date"
    );
    const totalIncomeStaffs = await totalIncomeHandler(staffsSql, "Paid_To_Date");
    const totalIncomeMen = await totalIncomeHandler(menSql, "Paid_To_Date");
    const totalIncomeWomen = await totalIncomeHandler(womenSql, "Paid_To_Date");
    const totalIncomeFullTime = await totalIncomeHandler(
        fullTimeSql,
        "Paid_To_Date"
    );
    const totalIncomePartTime = await totalIncomeHandler(
        partTimeSql,
        "Paid_To_Date"
    );

    const totalIncomeLastYear = await totalIncomeHandler(
        allSql,
        "Paid_Last_Year"
    );
    const totalIncomeShareholdersLastYear = await totalIncomeHandler(
        shareholdersSql,
        "Paid_Last_Year"
    );
    const totalIncomeStaffsLastYear = await totalIncomeHandler(
        staffsSql,
        "Paid_Last_Year"
    );
    const totalIncomeMenLastYear = await totalIncomeHandler(
        menSql,
        "Paid_Last_Year"
    );
    const totalIncomeWomenLastYear = await totalIncomeHandler(
        womenSql,
        "Paid_Last_Year"
    );
    const totalIncomeFullTimeLastYear = await totalIncomeHandler(
        fullTimeSql,
        "Paid_Last_Year"
    );
    const totalIncomePartTimeLastYear = await totalIncomeHandler(
        partTimeSql,
        "Paid_Last_Year"
    );

    const totalVacationDay = await totalIncomeHandler(allSql, "Vacation_Days");
    const totalVacationDayShareholders = await totalIncomeHandler(
        shareholdersSql,
        "Vacation_Days"
    );
    const totalVacationDayStaffs = await totalIncomeHandler(
        staffsSql,
        "Vacation_Days"
    );
    const totalVacationDayMen = await totalIncomeHandler(menSql, "Vacation_Days");
    const totalVacationDayWomen = await totalIncomeHandler(
        womenSql,
        "Vacation_Days"
    );
    const totalVacationDayFullTime = await totalIncomeHandler(
        fullTimeSql,
        "Vacation_Days"
    );
    const totalVacationDayPartTime = await totalIncomeHandler(
        partTimeSql,
        "Vacation_Days"
    );

    const countGeneralInfoDocuments = await GeneralInfo.find().countDocuments();

    if (countGeneralInfoDocuments === 0) {
        const generalInfo = new GeneralInfo({
            totalIncome,
            totalIncomeShareholders,
            totalIncomeStaffs,
            totalIncomeMen,
            totalIncomeWomen,
            totalIncomeFullTime,
            totalIncomePartTime,

            totalIncomeLastYear,
            totalIncomeShareholdersLastYear,
            totalIncomeStaffsLastYear,
            totalIncomeMenLastYear,
            totalIncomeWomenLastYear,
            totalIncomeFullTimeLastYear,
            totalIncomePartTimeLastYear,

            totalVacationDay,
            totalVacationDayShareholders,
            totalVacationDayStaffs,
            totalVacationDayMen,
            totalVacationDayWomen,
            totalVacationDayFullTime,
            totalVacationDayPartTime,
        });

        await generalInfo
            .save()
            .then((result) => res.send(result))
            .catch((err) => console.log(err));

        res.send({ message: "Update to date general info" });
    } else {
        const generalInfo = await GeneralInfo.findOne();

        await generalInfo.updateOne({
            totalIncome,
            totalIncomeShareholders,
            totalIncomeStaffs,
            totalIncomeMen,
            totalIncomeWomen,
            totalIncomeFullTime,
            totalIncomePartTime,

            totalIncomeLastYear,
            totalIncomeShareholdersLastYear,
            totalIncomeStaffsLastYear,
            totalIncomeMenLastYear,
            totalIncomeWomenLastYear,
            totalIncomeFullTimeLastYear,
            totalIncomePartTimeLastYear,

            totalVacationDay,
            totalVacationDayShareholders,
            totalVacationDayStaffs,
            totalVacationDayMen,
            totalVacationDayWomen,
            totalVacationDayFullTime,
            totalVacationDayPartTime,
        });

        await generalInfo.save();

        res.json({ message: "Update to date general info up to date" });
    }
};