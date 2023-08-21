const dao = require("../database/infoDAO");
const bcrypt = require("bcrypt");

const read = {
    updateInfo : async (id) => {
        const result = await dao.read.updateInfo(id);
        return result;
    }
}

const process = {
    modify : async (body, file) => {
        pw = bcrypt.hashSync(body.pw, 10);
        const result = await dao.process.modify(body, pw, file);
        let msg="", url="";
        if(result ==0){
            msg="문제발생.";
            url="/info/myPage/";
        }else{
            msg="수정되었습니다.";
            url="/info/myPage?id="+body.id;
        }
        return getMsg(msg,url);
    },
    boardList : async (id) => {
        const result = await dao.process.boardList(id);
        return result;
    },
    fileList : async (bno) => {
        const result = await dao.process.fileList(bno);
        return result;
    },
    qnaList : async (id) => {
        const result = await dao.process.qnaList(id);
        return result;
    },
    qnaFiles : async (bno) => {
        const result = await dao.process.qnaFiles(bno);
        return result;
    },
    exit : async (id) => {
        const result = await dao.process.exit(id);
        return result;
    }
}

const getMsg = (msg,url) => {
    return `<script>alert("${msg}"); location.href="${url}"; </script>`;
}

module.exports = {read, process};
