const fs = require("fs");
const service = require("../../service/info_service");
const renObj = require("../renObj");

const views = {
    infoView :  (req,res) => {
        res.render("info/myPage", renObj(req,{}));
    },
    modifyForm : async (req,res) => {
        res.render("info/modifyForm", renObj(req, {}));
    }
}

const process = {
    modify: async (req,res) => {
        let file = "";
        if (req.file == undefined) {
            if (req.session.user.PROFILE != "DefaultProfile.gif") fs.unlinkSync(req.session.user.PROFILE);
            file = "DefaultProfile.gif";
        }
        else file = req.file.filename;

        const msg = await service.process.modify(req.body, file);
        const result = await service.read.updateInfo(req.body.id);
        req.session.user = result;
        res.send(msg);
    }
}

module.exports = {views, process};