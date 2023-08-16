const ctrl = require("../../controller/qna/qna_ctrl");
const router = require("express").Router();

router.get("/list", ctrl.views.list);
router.get("/insertForm", ctrl.views.insertForm);
router.get("/content", ctrl.views.content);

router.post("/insert", ctrl.process.insert);
router.post("/contentChat", ctrl.process.contentChat);

module.exports = router;