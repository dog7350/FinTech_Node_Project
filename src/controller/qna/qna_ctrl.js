const fs = require("fs");
const service = require("../../service/qna_service");
const renObj = require("../renObj");

const rtnMsg = (msg, url) => {
    var str = `
                <script>
                    alert('${msg}');
                    location.href='${url}';
                </script>
              `;
    return str;
}

const views = {
    list : async (req, res) => {
        if (req.session.user == undefined) {
            res.send(rtnMsg("로그인이 필요합니다.", "/"));
            return;
        }

        const totalContent = await service.read.totalContent();
        const data = await service.read.list(req.query.start, totalContent);
        
        res.render("qna/qnaList", renObj(req, { list : data.list, totalContent, start : data.start, page : data.page }));
    },
    insertForm : (req, res) => {
        if (req.session.user == undefined) {
            res.send(rtnMsg("로그인이 필요합니다.", "/"));
            return;
        }
        
        res.render("qna/qnaInsertForm", renObj(req, {}));
    },
    content : async (req, res) => {
        if (req.session.user == undefined) {
            res.send(rtnMsg("로그인이 필요합니다.", "/"));
            return;
        }
        
        const chat = await service.read.content(req.query.bno);
        const files = await service.read.files(req.query.bno);

        if (chat[0].WRITER == req.session.user.ID || req.session.user.ADMIN == 1) {
            res.render("qna/qnaContent", renObj(req, { chat, files }));
        } else {
            res.send(rtnMsg("작성자 또는 관리자가 아닙니다.", "/qna/list"));
        }
    }
};

const process = {
    insert : async (req, res) => {
        const result = await service.insert.insert(req.body);
        res.redirect("/qna/list");
    },
    delete : async (req, res) => {
        const files = await service.read.files(req.query.bno);
        for(i = 0; i < files.length; i++) fs.unlinkSync(`./upload/${files[i].FILENAME}`);
        const result = await service.remove.delete(req.query.bno);
        res.send(`
                    <script>
                        alert("삭제되었습니다.");
                        location.href='/qna/list';
                    </script>
                 `);
    },
    contentChat : async (req, res) => {
        const result = await service.insert.contentChat(req.body);
    },
    fileUp : async (req, res) => {
        const result = await service.insert.fileUp(req.body, req.files);
        res.redirect("/qna/content?bno=" + req.body.bno);
    },
    fileDelete : async (req, res) => {
        const result = await service.remove.fileDelete(req.query.bno, req.query.fileName);
        fs.unlinkSync(`./upload/${req.query.fileName}`);
        res.redirect(`/qna/content?bno=${req.query.bno}`);
    }
};

module.exports = { views, process };