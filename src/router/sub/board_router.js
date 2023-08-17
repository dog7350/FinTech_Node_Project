const ctrl = require("../../controller/board/board_ctrl");
const router = require("express").Router();
const multer = require("multer");

const fileSetup = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"upload");
    },
    filename : (req,file,cb) => {
        cb(null,Data.now() + "-" + file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    const type = file.mimetype.split("/")[0];
    let collection = ["jpg","jpeg","png","gif","mp3","mp4"];
    for(let i=0; i < collection.length; i++) {
        if(type === collection[i]){
            cb(null,true);
            break;
        }else {
            cb(null,false);
        }
    }
}

const upload = multer({setup : fileSetup, filter : fileFilter});



router.get("/boardList",ctrl.views.boardList);

router.get("/boardForm",ctrl.views.boardForm);

router.post("/boardWrite",ctrl.process.boardWrite,upload.single("FILENAME"),ctrl.process.download);





module.exports = router;