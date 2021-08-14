// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const GeneralInfo = new Schema({
//     // totalIncome,
//     totalIncomeShareholders: { type: Number, required: true },
//     totalIncomeStaffs: { type: Number, required: true },
//     totalIncomeMen: { type: Number, required: true },
//     totalIncomeWomen: { type: Number, required: true },
//     totalIncomeFullTime: { type: Number, required: true },
//     totalIncomePartTime: { type: Number, required: true },

//     // createdAd: {type:Date, default:Date.now},
//     // updatedAd: {type:Date, default:Date.now},
// }, { timestamps: true });
// //Add plugins
// module.exports = mongoose.model("GeneralInfo", GeneralInfo);


//them moi
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GeneralInfo = new Schema({
    totalIncome: { type: Number, required: true },
    totalIncomeShareholders: { type: Number, required: true },
    totalIncomeStaffs: { type: Number, required: true },
    totalIncomeMen: { type: Number, required: true },
    totalIncomeWomen: { type: Number, required: true },
    totalIncomeFullTime: { type: Number, required: true },
    totalIncomePartTime: { type: Number, required: true },

    totalIncomeLastYear: { type: Number, required: true },
    totalIncomeShareholdersLastYear: { type: Number, required: true },
    totalIncomeStaffsLastYear: { type: Number, required: true },
    totalIncomeMenLastYear: { type: Number, required: true },
    totalIncomeWomenLastYear: { type: Number, required: true },
    totalIncomeFullTimeLastYear: { type: Number, required: true },
    totalIncomePartTimeLastYear: { type: Number, required: true },

    totalVacationDay: { type: Number, required: true },
    totalVacationDayShareholders: { type: Number, required: true },
    totalVacationDayStaffs: { type: Number, required: true },
    totalVacationDayMen: { type: Number, required: true },
    totalVacationDayWomen: { type: Number, required: true },
    totalVacationDayFullTime: { type: Number, required: true },
    totalVacationDayPartTime: { type: Number, required: true },

    // createdAd: {type:Date, default:Date.now},
    // updatedAd: {type:Date, default:Date.now},
}, { timestamps: true });
//Add plugins
module.exports = mongoose.model("GeneralInfo", GeneralInfo);