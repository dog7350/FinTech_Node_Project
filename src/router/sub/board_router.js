const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();
const multer = require("multer");

const image = ['JPG', 'JPEG', 'PNG', 'GIF'];
const movie = ['MP4', 'AVI'];
const music = ['MP3', 'WAV'];


const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null,"upload");
    },
    filename : (req, file, callback) => {
        
        callback(null, "BOARD_"+ new Date().getTime() + "_" + file.originalname.toUpperCase());
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




const upload = multer({storage:storage,fileFilter : f_Filter});




router.get("/boardList",ctrl.views.list);

router.get("/boardForm",ctrl.views.boardForm);

router.post("/boardWrite",upload.array("fileUp"),ctrl.process.boardWrite);


router.get("/boardModifyForm/:bno",ctrl.views.boardModifyForm);

router.post("/boardModify/:bno",upload.array("fileUp"),ctrl.process.boardModify);

router.get("/boardDel/:bno",ctrl.process.boardDel);

router.get("/boardContent", ctrl.views.boardContent);


module.exports = router;