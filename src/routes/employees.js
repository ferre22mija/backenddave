const express = require("express");
const router = express.Router();
const employeesController = require('./../controller/employeesController');
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
router.route('/').get(verifyRoles([ROLES_LIST.admin]),employeesController.readController)
module.exports = router