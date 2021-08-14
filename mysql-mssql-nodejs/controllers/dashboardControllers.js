const gene = require("../models/gene");
const hr = require("../models/hr");
const pr = require("../models/pr");
const geneController = require('./get-controller')
const {
    multipleMongooseToObject
} = require("../util/mongoose");
const mongoose = require("../util/mongoose")

module.exports = {
    getIndex(req, res, next) {
        geneController.updateGeneralInfo();
        generalInfo = gene.find().then(generalInfo => {
            console.log(generalInfo);
            const array = [generalInfo[0].totalIncomeShareholders, generalInfo[0].totalIncomeStaffs, generalInfo[0].totalIncomeMen, generalInfo[0].totalIncomeWomen, generalInfo[0].totalIncomeFullTime, generalInfo[0].totalIncomePartTime];
            const max = Math.max(...array);
            let test = array.map(item => Math.round(item / max * 100));
            const percentList = [{
                ...generalInfo[0],
                totalIncomeShareholdersPerCent: test[0],
                totalIncomeStaffsPerCent: test[1],
                totalIncomeMenPerCent: test[2],
                totalIncomeWomenPerCent: test[3],
                totalIncomeFullTimePerCent: test[4],
                totalIncomePartTimePerCent: test[5],
            }]



            console.log(percentList);

            res.render("index", {
                generalInfo: multipleMongooseToObject(generalInfo),
                percentList: percentList,
            });
        })

    },
    getTableInfo(req, res, next) {
        hr.getAllEmployees(result => {
            //console.log(result.recordset);
            res.render("specifile/tableinfosumof", {
                employees: Object.create(result.recordset)
            }, );

        })
    },
    edit(req, res, next) {
        res.render("editemployee");
    },
    postNew(req, res, next) {
        const {
            name,
            position,
            address,
            gender,
            phone,
            birthday,
            email,
            pay_rate,
            chucVu,
            vacation_day
        } = req.body;

        console.log(req.body)

        let benefitPlans;
        let shareholderStatus;

        if (position === "codong") {
            benefitPlans = 3
            shareholderStatus = 1;
        }
        if (position === "parttime") {
            benefitPlans = 2
            shareholderStatus = 0;

        }
        if (position === "fulltime") {
            benefitPlans = 1
            shareholderStatus = 0;

        }

        hr.addNewEmployee({
            firstName: name,
            address1: address,
            gender,
            phoneNumber: phone,
            email,
            benefitPlans,
            shareholderStatus

        }, result => {
            console.log(result)
            const idEmployee = result.recordset[0]['']; //get scope indentify rescordser[0][''] <=> recordset: [ { '': 11 } ],

            pr.addNewEmployee({
                Employee_Number: idEmployee,
                idEmployee,
                First_Name: name,
                Pay_Rate: pay_rate,
                Payrates_id: chucVu,
                Vacation_Days: vacation_day
            }, result => {
                console.log(result)
            })
        })


        res.redirect('/table')
    },
};