const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();
const multer = require("multer");

const image = ['JPG', 'JPEG', 'PNG', 'GIF'];
const movie = ['MP4', 'AVI'];
const music = ['MP3', 'MPEG'];


const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null,"./upload");
    },
    filename : (req, file, callback) => {
        date = req.body.nameTime;
        callback(null, date + "_BOARD_" + req.session.user.ID + "_" + file.originalname.toUpperCase());
    }
});

const f_Filter = (req,file,callback) => {
    const type = file.mimetype.split("/")[1];

    if (image.indexOf(type.toUpperCase()) != -1 || movie.indexOf(type.toUpperCase()) != -1 || music.indexOf(type.toUpperCase()) != -1) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const upload = multer({ storage : storage, fileFilter : f_Filter});

router.get("/", ctrl.views.main);

router.get("/boardSearch", ctrl.views.boardSearch);

router.get("/boardList",ctrl.views.list);
router.get("/boardForm",ctrl.views.boardForm);
router.get("/boardContent", ctrl.views.boardContent);

router.post("/boardWrite",upload.array("fileUp"),ctrl.process.boardWrite);
router.post("/report", ctrl.process.report);

router.get("/boardModifyForm/:bno",ctrl.views.boardModifyForm);
router.post("/boardModify/:bno",upload.array("fileUp"),ctrl.process.boardModify);
router.get("/boardDel/:bno",ctrl.process.boardDel);
router.get("/boardContent", ctrl.views.boardContent);

module.exports = router;