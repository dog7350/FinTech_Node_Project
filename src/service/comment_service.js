const dao = require("../database/commentDAO");

const read = {
    cno : async (bno) => {
        const result = await dao.read.cno(bno);
        return result.rows[0]['MAX(CNO)'];
    }
}

const insert = {
    register : async (body, id, cno) => {
        const cmtFile = await dao.read.cmtFile(id);
        const file = cmtFile.rows[0]["PROFILE"];
        const result = await dao.insert.register(body, id, cno, file);
        return result;
    },
    report : async (body, id) => {
        const result = await dao.insert.report(body, id);
        return result;
    }
}

const remove = {
    delete : async (query) => {
        const result = await dao.remove.delete(query);
        return result;
    }
}

const update = {
    modify : async (body)=>{
        const result = await dao.update.modify(body);
        return result;
    }
}

module.exports = { read, insert, remove, update };