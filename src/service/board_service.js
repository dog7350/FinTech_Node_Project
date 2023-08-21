const dao = require("../database/boardDAO");

const read = {
    boardList : async (req, res) => {
        const list = await dao.read.boardList();
        return list;
    },
    boardContent : async (id) => {
        const result = await dao.read.boardContent(id);
        return result;
    },
    boardFile : async (id) => {
        const result = await dao.read.boardFile(id);
        return result;
    },
    cmt : async (id) => {
        const result = await dao.read.cmt(id);
        return result;
    },
    boardReport : async (id) => {
        const result = await dao.read.boardReport(id);
        return result['COUNT(*)'];
    },
    cmtReport : async (id) => {
        const result = await dao.read.cmtReport(id);
        return result['COUNT(*)'];
    },
    
    upHit : async (bno) => {
        console.log("123", bno)
        pageUpdate.upHit(bno);
    }
}

const insert = {
    report : async (bno, id) => {
        const result = await dao.insert.report(bno, id);
        return result;
    }
}

const remove = {

}

const pageUpdate = {
    upHit : async (bno) => {
        await dao.daoUpdate.upHit(bno);
    }
}

module.exports = { read, insert, remove};