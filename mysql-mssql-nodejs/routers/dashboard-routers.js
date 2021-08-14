const express = require("express");
const dashboardControllers = require("../controllers/dashboardControllers");


const dashboardRouter = express.Router();

//UI
//dashboard
dashboardRouter.get("/table", dashboardControllers.getTableInfo);

dashboardRouter.get("/edit", dashboardControllers.edit);

dashboardRouter.get("/", dashboardControllers.getIndex);

dashboardRouter.post("/edit/new", dashboardControllers.postNew);


module.exports = dashboardRouter;