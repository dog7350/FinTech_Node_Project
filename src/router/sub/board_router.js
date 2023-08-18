const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();

router.get("/boardContent", ctrl.views.boardContent);
router.get("/boardList", ctrl.views.list);

module.exports = router;