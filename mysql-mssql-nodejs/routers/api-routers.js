const express = require("express");
const gene = require("../controllers/get-controller");
const hrControllers = require("../controllers/hrControllers");
const prControllers = require("../controllers/prControllers");

const apiRouter = express.Router();


apiRouter.get("/generalinfo", gene.getGeneralInfo);

apiRouter.get("/generalinfo/update", gene.updateGeneralInfo);
//API
//pr

apiRouter.get("/pr/employees", prControllers.getAllEmployees);

apiRouter.get("/pr/employees/:idEmployee", prControllers.getEmployee);

apiRouter.get("/pr/new-employee", prControllers.addNewEmployee);

apiRouter.get("/pr/update-employee", prControllers.updateEmployee);

apiRouter.get("/pr/delete-employee", prControllers.deleteEmployee);

//hr
apiRouter.get("/hr/employees", hrControllers.getAllEmployees);

apiRouter.get("/hr/employees/:employeeId", hrControllers.getEmployee);

apiRouter.get("/hr/new-employee", hrControllers.addNewEmployee);

apiRouter.get("/hr/update-employee", hrControllers.updateEmployee);

apiRouter.get("/hr/delete-employee", hrControllers.deleteEmployee);

module.exports = apiRouter;