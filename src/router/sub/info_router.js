const ctrl = require("../../controller/info/info_ctrl");
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

router.get("/exit", ctrl.process.exit);
router.get("/myPage", ctrl.views.infoView);
router.post("/modifyForm", ctrl.views.modifyForm);
router.post("/modify", upload.single("file_name"), ctrl.process.modify);

module.exports = router;