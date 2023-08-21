const ctrl = require("../../controller/info/info_ctrl");
const router = require("express").Router();

router.get("/myPage", ctrl.views.infoView);
router.get("/modifyForm", ctrl.views.modifyForm);

module.exports = router;