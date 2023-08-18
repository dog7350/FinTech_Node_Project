const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();

 router.get("/boardList", ctrl.views.list);

 router.get("/content:bno", ctrl.views.content);



module.exports = router;