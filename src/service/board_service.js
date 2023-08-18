const dao = require("../database/boardDAO");

const BoardInsert = async (body,member) => {
    const result = await dao.daoInsert.boardContentInsert(body,member);
}

const fileName = async (num,fileName) => {
    const result = await dao.daoInsert.fileNameInsert(num,fileName);
}

const maxNumber = async () => {
    const result = await dao.daoInsert.boardNumber();
   
    return result;
}



module.exports = {BoardInsert, fileName, maxNumber};