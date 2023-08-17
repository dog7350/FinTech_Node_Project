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
    
}


router.get("/boardList",ctrl.views.boardList);

router.get("/boardForm",ctrl.views.boardForm);

router.post("/boardWrite",ctrl.process.boardWrite);





module.exports = router;