const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();

router.get("/boardList",ctrl.views.boardList);

router.get("/boardForm",ctrl.views.boardForm);

router.post("/boardWrite",ctrl.process.boardWrite);



module.exports = router;