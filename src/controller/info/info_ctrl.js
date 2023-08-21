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
            if (req.session.user.PROFILE != "DefaultProfile.gif") fs.unlinkSync(`./upload/${req.session.user.PROFILE}`);
            file = "DefaultProfile.gif";
        }
        else file = req.file.filename;

        const msg = await service.process.modify(req.body, file);
        const result = await service.read.updateInfo(req.body.id);
        req.session.user = result;
        res.send(msg);
    },
    exit : async (req, res) => {
        id = req.query.id;
        const boards = await service.process.boardList(id);
        for (i = 0; i < boards.length; i++) {
            if (boards[i].THUMBNAIL != "DefaultThumbnail.jpg") fs.unlinkSync(`./upload/${boards[i].THUMBNAIL}`);
            const files = await service.process.fileList(boards[i].BNO);
            for (j = 0; j < files.length; j++) fs.unlinkSync(`./upload/${files[j].FILENAME}`);
        }
        
        const qnas = await service.process.qnaList(id);
        for (i = 0; i < qnas.length; i++) {
            const files = await service.process.qnaFiles(qnas[i].BNO);
            for (j = 0; j < files.length; j++) fs.unlinkSync(`./upload/${files[j].FILENAME}`);
        }

        if (req.session.user.PROFILE != "DefaultProfile.gif") fs.unlinkSync(`./upload/${req.session.user.PROFILE}`);
        const result = await service.process.exit(id);
        req.session.destroy();
        res.send(`
                    <script>
                        alert("탈퇴되었습니다.");
                        location.href="/";
                    </script>
                 `)
    }
}

module.exports = {views, process};