const ctrl = require("../../controller/admin/admin_ctrl");
const router = require("express").Router();

router.get("/list", ctrl.views.list);

module.exports = router;