const service = require("../../service/qna_service");
const renObj = require("../renObj");

const rtnMsg = (res, msg, url) => {
    res.send(`
                <script>
                    alert(${msg});
                    location.href=${url};
                </script>
            `);
}
const logPass = (req, res) => {
    if (req.session.user == undefined) {
        rtnMsg(res, "로그인이 필요합니다.", "/");
        return;
    }
}

const views = {
    list : async (req, res) => {
        logPass(req, res);
        const totalContent = await service.read.totalContent();
        const data = await service.read.list(req.query.start, totalContent);

        res.render("qna/qnaList", renObj(req, { list : data.list, totalContent, start : data.start, page : data.page }));
    },
    insertForm : (req, res) => {
        logPass(req, res);
        res.render("qna/qnaInsertForm", renObj(req, {}));
    },
    content : async (req, res) => {
        logPass(req, res);
        const chat = await service.read.content(req.query.bno);
        const files = await service.read.files(req.query.bno);

        if (chat[0].WRITER == req.session.user.ID || req.session.user.ADMIN == 1) {
            res.render("qna/qnaContent", renObj(req, { chat, files }));
        } else {
            rtnMsg(res, "작성자 또는 관리자가 아닙니다.", "/qna/list");
        }
    }
};

const process = {
    insert : async (req, res) => {
        const result = await service.insert.insert(req.body);
        res.redirect("/qna/list");
    },
    contentChat : async (req, res) => {
        const result = await service.insert.contentChat(req.body);
    }
};

module.exports = { views, process };