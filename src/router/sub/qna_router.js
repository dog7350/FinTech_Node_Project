const ctrl = require("../../controller/qna/qna_ctrl");
const router = require("express").Router();
const multer = require("multer");

const image = ['JPG', 'JPEG', 'PNG', 'GIF'];
const movie = ['MP4', 'AVI'];
const music = ['MP3', 'MPEG'];

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "upload");
    },
    filename : (req, file, cb) => {
        cb(null, "QNA_" + req.body.bno + "_" + file.originalname.toUpperCase());
    }
});
const f_Filter = (req,file,cb) => {
    const type = file.mimetype.split("/")[1];

    if (image.indexOf(type.toUpperCase()) != -1 || movie.indexOf(type.toUpperCase()) != -1 || music.indexOf(type.toUpperCase()) != -1) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer( { storage : storage, fileFilter : f_Filter } );

router.get("/list", ctrl.views.list);
router.get("/insertForm", ctrl.views.insertForm);
router.get("/content", ctrl.views.content);

router.post("/insert", ctrl.process.insert);
router.post("/contentChat", ctrl.process.contentChat);
router.get("/delete", ctrl.process.delete);

router.post("/fileUp", upload.array("qnaFiles"), ctrl.process.fileUp);
router.get("/fileDelete", ctrl.process.fileDelete);

module.exports = router;