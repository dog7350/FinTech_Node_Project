const ctrl = require("../../controller/admin/admin_ctrl");
const router = require("express").Router();

router.get("/list", ctrl.views.list);
router.get("/allChat", ctrl.views.allChat);
router.get("/adminSearch", ctrl.views.adminSearch);
router.get("/info", ctrl.views.info);

router.get("/manager", ctrl.process.manager);
router.get("/stop", ctrl.process.stop);
router.get("/exit", ctrl.process.exit);

router.get("/memberBoard", ctrl.views.memberBoard);
router.get("/memberCmt", ctrl.views.memberCmt);
router.get("/memberChat", ctrl.views.memberChat);

module.exports = router;