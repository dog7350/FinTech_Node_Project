const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();

router.get("/boardList", ctrl.views.boardList);
router.get("/boardContent", ctrl.views.boardContent);
router.post("/report", ctrl.process.report);

module.exports = router;