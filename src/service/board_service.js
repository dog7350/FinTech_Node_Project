const dao = require("../database/boardDAO");

const read = {
    boardList : async (req, res) => {
        const list = await dao.read.boardList();
        console.log("ser boardList : ", list)
        return list;
    },
    boardContent : async (id) => {
        console.log("ser boardContent : ", id)
        const result = await dao.read.boardContent(id);
        console.log("ser boardContent : ", result)
        return result;
    },
    boardFile : async (id) => {
        console.log("ser boardFile : ", id)
        const result = await dao.read.boardFile(id);
        console.log("ser boardFile : ", result)
        return result;
    },
    cmt : async (id) => {
        console.log("ser cmt : ", id)
        const result = await dao.read.cmt(id);
        console.log("ser cmt : ", result)
        return result;
    },
    boardReport : async (id) => {
        const result = await dao.read.boardReport(id);
        return result['COUNT(*)'];
    }   
}

const insert = {
    
}

const remove = {

}

module.exports = { read, insert, remove };