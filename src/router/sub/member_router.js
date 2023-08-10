const ctrl = require("../../controller/member/member_ctrl");
const router = require("express").Router();

router.get("/joinForm", ctrl.views.joinForm);

module.exports = router;