const ctrl = require("../../controller/member/member_ctrl");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "upload");
    },
    filename : (req, file, cb) => {
        const ext = file.mimetype.split("/")[1]
        const id = req.body.id;
        cb(null, id + "_Profile." + ext);
    }
});
const upload = multer( { storage : storage } );

router.get("/joinForm", ctrl.views.joinForm);
router.get("/joinIdCheck", ctrl.process.joinIdCheck);
router.get("/jusoPopup", ctrl.views.jusoPopup);
router.post('/jusoPopup', ctrl.process.rtnJusoPopup);
router.get("/mailAuth", ctrl.process.mailAuth);
router.post("/join", upload.single("file_name"), ctrl.process.join);

router.post("/login", ctrl.process.login);
router.get("/logout", ctrl.process.logout);

module.exports = router;