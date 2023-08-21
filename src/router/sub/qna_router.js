const ctrl = require("../../controller/qna/qna_ctrl");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "upload");
    },
    filename : (req, file, cb) => {
        cb(null, "QNA_" + req.body.bno + "_" + file.originalname.toUpperCase());
    }
});
const upload = multer( { storage : storage } );

router.get("/list", ctrl.views.list);
router.get("/insertForm", ctrl.views.insertForm);
router.get("/content", ctrl.views.content);

router.post("/insert", ctrl.process.insert);
router.post("/contentChat", ctrl.process.contentChat);

router.post("/fileUp", upload.array("qnaFiles"), ctrl.process.fileUp);

module.exports = router;