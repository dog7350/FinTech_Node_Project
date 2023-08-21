const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null,"upload");
    },
    filename : (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    }
});

const f_Filter = (req,file,callback) => {
    const type = file.mimetype.split("/")[1];
    if(type === "png" || type === "gif" || type === "jpg" || type === "jpeg" || type === "mp3" || type === "mp4") {
        callback(null,true);
    }else {
        callback(null,false);
    }
}
const upload = multer({ storage : storage, fileFilter : f_Filter});

router.get("/", ctrl.views.main);

router.get("/boardSearch", ctrl.views.boardSearch);

router.get("/boardList",ctrl.views.list);
router.get("/boardForm",ctrl.views.boardForm);
router.post("/boardWrite",upload.array("fileUp"),ctrl.process.boardWrite);
router.get("/boardModifyForm",ctrl.process.boardModifyForm);

router.get("/boardContent", ctrl.views.boardContent);
router.get("/boardList", ctrl.views.list);

module.exports = router;