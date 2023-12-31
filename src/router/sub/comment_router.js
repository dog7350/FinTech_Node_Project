const ctrl = require("../../controller/comment/comment_ctrl");
const router = require("express").Router();

router.post("/register", ctrl.process.register);
router.post("/modify", ctrl.process.modify);
router.get("/delete", ctrl.process.delete);
router.post("/report", ctrl.process.report);

module.exports = router;