const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();

router.get("/boardList", ctrl.views.boardList);
router.get("/boardContent", ctrl.views.boardContent);

module.exports = router;