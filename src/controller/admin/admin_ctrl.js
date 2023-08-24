const mongoose = require("mongoose");
const chatLog = require("../../../config/mongo_config");
const service = require("../../service/admin_service");
const renObj = require("../renObj");

const bakMsg = (msg) => {
    const str = `
                    <script>
                        alert(${msg});
                        history.back();
                    </script>
                `;

    return str;
}
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
        if (req.session.user != undefined && req.session.user.ADMIN == 0) {
            res.send(bakMsg("관리자만 이용 가능합니다."));
        }

        const totalContent = await service.read.totalContent();

        const data = await service.read.list(req.query.start, totalContent);
        res.render("admin/adminList", renObj(req, {list:data.list, start:data.start, page:data.page}));
    },
    adminSearch : async (req, res) => {
        const totalContent = await service.read.searchTotalContent(req.query.searchTxt, req.query.searchCat);
        const data = await service.read.searchList(req.query.start, totalContent, req.query.searchTxt, req.query.searchCat);

        res.render("admin/adminList", renObj(req, {list:data.list, start:data.start, page:data.page}));
    },
    info : async (req, res) => {
        const member = await service.read.info(req.query.id);
        res.render("admin/adminInfo", renObj(req, {member}));
    },
    memberBoard : async (req, res) => {
        const totalContent = await service.read.adminBoardTotal(req.query.id);

        const data = await service.read.memberBoard(req.query.start, totalContent, req.query.id);
        res.render("admin/boardPopup", renObj(req, {id:req.query.id, list:data.list, start:data.start, page:data.page, layout : false}));
    },
    memberCmt : async (req, res) => {
        const totalContent = await service.read.adminCmtTotal(req.query.id);

        const data = await service.read.memberCmt(req.query.start, totalContent, req.query.id);
        res.render("admin/cmtPopup", renObj(req, {id:req.query.id, list:data.list, start:data.start, page:data.page, layout : false}));
    },
    memberChat : async (req, res) => {
        start = (req.query.start && req.query.start >= 1) ? Number(req.query.start) : 1;
        mongoose.connect('mongodb://fntc:fntc@fntc.kro.kr:27017/fntcChatLog', { useNewUrlParser: true });

        id = req.query.id;
        await chatLog.find({'id' : id}, {'_id' : 0, 'updatedAt' : 0, '__v' : 0}).count().exec().then((total) => {
            const page = service.pageOperation(start, total);

            chatLog.find({'id' : req.query.id}, {'_id' : 0, 'updatedAt' : 0, '__v' : 0}).sort({'createdAt' : -1}).skip(page.startNum).limit(15).exec().then((list) => {
                mongoose.disconnect();
                res.render("admin/chatPopup", renObj(req, {id:id, list:list, start:start, page:page, layout : false}));
            }).catch((e) => { console.log(e) });
        }).catch((e) => { console.log(e) });
    },
    allChat : async (req, res) => {
        start = (req.query.start && req.query.start >= 1) ? Number(req.query.start) : 1;
        mongoose.connect('mongodb://fntc:fntc@fntc.kro.kr:27017/fntcChatLog', { useNewUrlParser: true });

        await chatLog.find({}, {'_id' : 0, 'updatedAt' : 0, '__v' : 0}).count().exec().then((total) => {
            const page = service.pageOperation(start, total);

            chatLog.find({}, {'_id' : 0, 'updatedAt' : 0, '__v' : 0}).sort({'createdAt' : -1}).skip(page.startNum).limit(15).exec().then((list) => {
                mongoose.disconnect();
                res.render("admin/allChat", renObj(req, {list:list, start:start, page:page}));
            }).catch((e) => { console.log(e) });
        }).catch((e) => { console.log(e) });
    }
};

const process = {
    payments : async (req, res) => {
        const status = await service.update.cash(req.session.user.ID, req.query.price);
        const result = await service.read.info(req.session.user.ID);

        req.session.user = result;

        res.send(rtnMsg("충전되었습니다.", "/"));
    },
    buyItem : async (req, res) => {
        if (req.session.user.CASH < req.query.price) {
            res.send(`<script>alert("잔액이 부족합니다."); history.back();</script>`);
        } else {
            money = req.session.user.CASH - req.query.price;
            const status = await service.update.cash(req.session.user.ID, money);
            const result = await service.read.info(req.session.user.ID);
    
            req.session.user = result;

            path = `./upload/${req.query.file}`;
            ext = req.query.file.split(".")[1];
            filename = "download." + ext;
            res.download(path, filename);
        }
    },
    manager : async (req, res) => {
        if (req.query.id == "admin") {
            res.send(bakMsg("메인 관리자는 설정할 수 없습니다."));
            return;
        }
        setNum = (req.query.admin == 1) ? 0 : 1;
        const result = await service.update.manager(req.query.id, setNum);

        res.send(rtnMsg("권한 설정", `/admin/info?id=${req.query.id}`));
    },
    stop : async (req, res) => {
        if (req.query.id == "admin") {
            res.send(bakMsg("메인 관리자는 설정할 수 없습니다."));
            return;
        }
        setNum = (req.query.stop == 1) ? 0 : 1;
        str = (setNum == 1) ? "회원 정지" : "회원 활성";
        const result = await service.update.stop(req.query.id, setNum);

        res.send(rtnMsg(str, `/admin/info?id=${req.query.id}`));
    },
    exit : async (req, res) => {
        if (req.query.id == "admin") {
            res.send(bakMsg("메인 관리자는 설정할 수 없습니다."));
            return;
        }
        const result = await service.remove.exit(req.query.id);

        res.send(rtnMsg("회원 강퇴", `/admin/info?id=${req.query.id}`));
    }
};

module.exports = { views, process };