const dao = require("../database/commentDAO");

const read = {
    cno : async (bno) => {
        const result = await dao.read.cno(bno);
        console.log("service", result);
        return result.rows[0]['MAX(CNO)'];
    }
}

const insert = {
    register : async (body, cno) => {
        const cmtFile = await dao.read.cmtFile(body.writer);
        const file = cmtFile.rows[0]["PROFILE"];
        const result = await dao.insert.register(body, cno, file);
        console.log("ser2", result);
        return result;
    }
}

const remove = {
    delete : async (query) => {
        const result = await dao.remove.delete(query);
        console.log("ser remove", result);
        return result;
    }
}

const update = {
    modify : async (body)=>{
        const result = await dao.update.modify(body);
        console.log("ser3", result);
        return result;
    }
}

module.exports = { read, insert, remove, update };