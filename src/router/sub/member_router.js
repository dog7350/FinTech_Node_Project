const ctrl = require("../../controller/member/member_ctrl");
const router = require("express").Router();

router.get("/joinForm", ctrl.views.joinForm);

router.get("/jusoPopup", ctrl.views.jusoPopup);
router.post('/jusoPopup', ctrl.process.rtnJusoPopup);

router.get("/mailAuth", ctrl.process.mailAuth);

module.exports = router;